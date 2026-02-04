import fs from "node:fs";
import path from "node:path";

export function emitPaymentEvent(root: string, event: any) {
  const p = path.join(
    root,
    "../wfsl-ops-control-plane/register/payment-events.json"
  );

  const existing = JSON.parse(fs.readFileSync(p, "utf8"));
  const eventId = `wfsl-${new Date().toISOString().slice(0,10)}-${existing.length + 1}`;

  const fullEvent = {
    event_id: eventId,
    repo: event.repo,
    github: event.github,
    task: event.task,
    amount: event.amount,
    commit: event.commit,
    pr: event.pr,
    evidence_hash: event.evidence_hash,
    status: "approved",
    paid: false,
    created_at: event.created_at
  };

  existing.push(fullEvent);
  fs.writeFileSync(p, JSON.stringify(existing, null, 2));

  return fullEvent;
}
