import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

export function generateInvoice(root: string, event: any) {
  const invoicesDir = path.join(root, "artefacts", "invoices");
  fs.mkdirSync(invoicesDir, { recursive: true });

  const invoiceId = `wfsl-invoice-${event.event_id}`;
  const issuedAt = new Date().toISOString();

  const invoice = {
    schema: "wfsl.invoice.v1",
    issuer: "Wynergy Fibre Solutions Ltd",
    invoice_id: invoiceId,
    event_id: event.event_id,
    policy_version: "policy:v1.0-payment-eligibility",
    issued_at: issuedAt,
    payee: {
      github: event.github
    },
    work: {
      task: event.task,
      repo: event.repo,
      pr: event.pr,
      commit: event.commit
    },
    amount: event.amount,
    evidence: {
      ci_artefact: "artefacts/ci-input.json",
      event_hash: event.evidence_hash
    },
    status: "issued"
  };

  const canonical = JSON.stringify(invoice);
  const hash = crypto.createHash("sha256").update(canonical).digest("hex");

  const output = {
    ...invoice,
    invoice_hash: `sha256:${hash}`
  };

  const filePath = path.join(invoicesDir, `${invoiceId}.json`);
  fs.writeFileSync(filePath, JSON.stringify(output, null, 2));

  return filePath;
}
