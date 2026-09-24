#!/usr/bin/env node
// seed-first-admin.mjs — Bawoj project
//
// Creates the first Auth account + Firestore profile for a brand-new
// Firebase project. No wipe step — nothing to clear on a fresh project.
//
// Requires the Admin SDK service account key for THIS project specifically
// (Console > Project Settings > Service Accounts > Generate new private
// key) — double-check it's Bawoj's key, not Stationery Manager's, if both
// are sitting in nearby folders. Never commit this file.
//
//   npm install firebase-admin
//   node seed-first-admin.mjs /path/to/serviceAccountKey.json

import admin from "firebase-admin";
import { readFileSync } from "node:fs";

const NEW_ADMIN_EMAIL = "developer@zentrya.co.tz";
const NEW_ADMIN_PASSWORD = "20052oo5";
const NEW_ADMIN_NAME = "Developer"; // ← swap for the real display name

const serviceAccountPath = process.argv[2];
if (!serviceAccountPath) {
  console.error("Usage: node seed-first-admin.mjs /path/to/serviceAccountKey.json");
  process.exit(1);
}

const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));
const projectId = serviceAccount.project_id;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();
const db = admin.firestore();

async function main() {
  console.log(`Creating first admin in project "${projectId}"...`);

  const userRecord = await auth.createUser({
    email: NEW_ADMIN_EMAIL,
    password: NEW_ADMIN_PASSWORD,
    displayName: NEW_ADMIN_NAME,
  });

  const now = Date.now();
  await db.doc(`users/${userRecord.uid}`).set({
    name: NEW_ADMIN_NAME,
    email: NEW_ADMIN_EMAIL,
    role: "admin",
    status: "active",
    permissions: [], // admins bypass permission checks via role — no grants needed
    lastActivityAt: null,
    createdAt: now,
    updatedAt: now,
  });

  console.log(`\nDone.`);
  console.log(`  Email:    ${NEW_ADMIN_EMAIL}`);
  console.log(`  Password: ${NEW_ADMIN_PASSWORD}`);
  console.log(`  UID:      ${userRecord.uid}`);
}

main().catch((err) => {
  if (err.code === "auth/email-already-exists") {
    console.error(`\n"${NEW_ADMIN_EMAIL}" already exists in this project — nothing was created.`);
  } else {
    console.error("\nScript failed:", err);
  }
  process.exit(1);
});