import { emitPaymentEvent } from "../core/events.js";
import { generateInvoice } from "../core/invoice.js";

async function main() {
  const root = process.cwd();

  // Minimal stub event to bootstrap artefacts
  const validated = {
    repo: "wfsl-payments-orchestrator",
    github: "paul-wynn",
    task: "bootstrap-payment",
    amount: { value: 500, currency: "GBP" },
    commit: "BOOTSTRAP",
    pr: 0,
    evidence_hash: "bootstrap",
    created_at: new Date().toISOString()
  };

  const event = emitPaymentEvent(root, validated);
  const invoicePath = generateInvoice(root, event);

  console.log("Payment event registered.");
  console.log("Invoice issued:", invoicePath);
}

main().catch(err => {
  console.error(err.message);
  process.exit(1);
});
