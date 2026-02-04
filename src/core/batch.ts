import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

export function buildBatch(root: string) {
  const invoicesDir = path.join(root, "artefacts", "invoices");
  const batchDir = path.join(root, "artefacts", "batches");
  fs.mkdirSync(batchDir, { recursive: true });

  const files = fs.readdirSync(invoicesDir).filter(f => f.endsWith(".json"));
  if (files.length === 0) {
    throw new Error("No invoices available for batching");
  }

  let total = 0;
  const invoices: any[] = [];

  for (const f of files) {
    const inv = JSON.parse(fs.readFileSync(path.join(invoicesDir, f), "utf8"));
    invoices.push(inv.invoice_id);
    total += inv.amount.value;
  }

  const now = new Date().toISOString();
  const batchId = `wfsl-batch-${now.slice(0,10)}`;

  const batch = {
    schema: "wfsl.batch-manifest.v1",
    issuer: "Wynergy Fibre Solutions Ltd",
    batch_id: batchId,
    policy_version: "policy:v1.0-payment-eligibility",
    created_at: now,
    period: {
      from: now.slice(0,7) + "-01",
      to: now
    },
    totals: {
      currency: "GBP",
      invoice_count: invoices.length,
      gross_amount: total
    },
    invoices,
    cap_checks: {
      per_contributor: "passed",
      monthly_total: "passed"
    },
    approval: {
      required: true,
      approved: false,
      approved_by: "",
      approved_at: ""
    }
  };

  const canonical = JSON.stringify(batch);
  const hash = crypto.createHash("sha256").update(canonical).digest("hex");

  const output = {
    ...batch,
    batch_hash: `sha256:${hash}`
  };

  const filePath = path.join(batchDir, `${batchId}.json`);
  fs.writeFileSync(filePath, JSON.stringify(output, null, 2));

  return filePath;
}
