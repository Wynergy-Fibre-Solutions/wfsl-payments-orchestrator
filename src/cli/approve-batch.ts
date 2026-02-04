import fs from "node:fs";

const file = process.argv[2];
const approver = process.argv[3];

if (!file || !approver) {
  console.error("Usage: approve-batch <batch-file> <approver>");
  process.exit(1);
}

const batch = JSON.parse(fs.readFileSync(file, "utf8"));

if (batch.approval.approved) {
  throw new Error("Batch already approved");
}

batch.approval.approved = true;
batch.approval.approved_by = approver;
batch.approval.approved_at = new Date().toISOString();

fs.writeFileSync(file, JSON.stringify(batch, null, 2));
console.log("Batch approved:", batch.batch_id);
