/**
 * Buyer creates a requirements of services serving as an index
 * @param {com.algorythmix.assets.InitiateRequirements} tx -
 * @transaction
 */
 async function InitiateRequirements(tx) {
   var factory = getFactory();
   var registry = await getAssetRegistry('com.algorythmix.assets.Requirements');
   var requirements = factory.newResource('com.algorythmix.assets', 'Requirements', tx.id);
   requirements.corporationId = getCurrentParticipant().getFullyQualifiedIdentifier().slice(41);
   requirements.description = tx.description;
   requirements.vendorId = tx.vendorId;
   await registry.add(requirements);
 };


/**
 * Request for financing is created
 * @param {com.algorythmix.assets.InitiateInvoiceRequest} tx -
 * @transaction
 */
 async function InitiateInvoiceRequest(tx) {
  var factory = getFactory();
   var registry = await getAssetRegistry('com.algorythmix.assets.InvoiceRequest');

   var request = factory.newResource('com.algorythmix.assets', 'InvoiceRequest', tx.id);
   request.vendorId = getCurrentParticipant().getFullyQualifiedIdentifier().slice(36);
   request.corporationId = tx.corporationId;
   request.requirementsId = tx.requirementsId;
   request.invoiceId = tx.invoiceId;
   request.paymentDate = tx.paymentDate;
   request.amountRequested = tx.amountRequested;
   request.requestStatus = 'APPROVAL_PENDING';

   await registry.add(request);
 };

/**
 * Corporation approves a legit invoice
 * @param {com.algorythmix.assets.ApproveInvoiceRequest} tx -
 * @transaction
 */
async function ApproveInvoiceRequest(tx) {
  var factory = getFactory();
  var registry = await getAssetRegistry('com.algorythmix.assets.InvoiceRequest');
  // if (!await registry.exists(tx.invoiceRequestId)) { throw new Error('Incorrect invoice ID') }
  var request = await registry.get(tx.invoiceRequestId);
  request.requestStatus = 'APPROVED';
  await registry.update(request);
};

/**
 * Financer initiates a proposal for a discounting procedure
 * @param {com.algorythmix.assets.InitiateProposal} tx -
 * @transaction
 */
async function InitiateProposal(tx) {
  var factory = getFactory();
  var registry = await getAssetRegistry('com.algorythmix.assets.Proposal');
  var invoiceRequestRegistry = await getAssetRegistry('com.algorythmix.assets.InvoiceRequest');
  var invoiceRequest = await invoiceRequestRegistry.get(tx.invoiceRequestId);

  if (invoiceRequest.requestStatus !== 'APPROVED') { throw new Error('Not yet approved by the corporation'); };

  var proposal = factory.newResource('com.algorythmix.assets', 'Proposal', tx.id);
  proposal.proposalStatus = 'APPROVAL_PENDING';
  proposal.invoiceRequestId = tx.invoiceRequestId;
  proposal.invoiceId = invoiceRequest.invoiceId;
  proposal.vendorId = tx.vendorId
  proposal.financerId = tx.financerId;
  proposal.corporationId = tx.corporationId;
  proposal.amount = tx.amount;
  proposal.numberOfDays = tx.numberOfDays;
  proposal.interestRate = tx.interestRate;
  proposal.dateOfCreation = new Date();

  await registry.add(proposal);
};

/**
 * Vendor approves a proposal made by a financer
 * @param {com.algorythmix.assets.VendorApprovesProposal} tx -
 * @transaction
 */
async function VendorApprovesProposal(tx) {
  var factory = getFactory();
  var registry = await getAssetRegistry('com.algorythmix.assets.Proposal');
  var proposal = await registry.get(tx.proposalId);
  if (tx.approve) {
    proposal.proposalStatus = 'APPROVED_BY_VENDOR';
  } else {
    proposal.proposalStatus = 'REJECTED_BY_VENDOR';
  };
  await registry.update(proposal);
};

/**
 * Corporation approves of a proposal after it is approved by a vendor
 * @param {com.algorythmix.assets.CorporationApprovesProposal} tx -
 * @transaction
 */
async function CorporationApprovesProposal(tx) {
  var factory = getFactory();
  var registry = await getAssetRegistry('com.algorythmix.assets.Proposal');
  var proposal = await registry.get(tx.proposalId);
  if (proposal.proposalStatus !== 'APPROVED_BY_VENDOR') {
    throw new Error(`Expected APPROVED_BY_VENDOR, actual value ${proposal.proposalStatus}`);
  };
  if (tx.approve) {
    proposal.proposalStatus = 'APPROVED_BY_CORPORATION';
  } else {
    proposal.proposalStatus = 'REJECTED_BY_VCORPORATION';
  };
  await registry.update(proposal);
  if (tx.approve) {
    var invoiceRegistry = await getAssetRegistry('com.algorythmix.assets.InvoiceDiscounting');
    var uuid = proposal.invoiceRequestId + proposal.id;

    var invoiceDiscount = factory.newResource('com.algorythmix.assets', 'InvoiceDiscounting', uuid);
    invoiceDiscount.proposalId = tx.proposalId;
    invoiceDiscount.vendorId = tx.vendorId;
    invoiceDiscount.financerId = tx.financerId;
    invoiceDiscount.corporationId = tx.corporationId;
    invoiceDiscount.invoiceDiscountingStatus = 'AWAITING_PAYMENT';
    await invoiceRegistry.add(invoiceDiscount);
  };
};
