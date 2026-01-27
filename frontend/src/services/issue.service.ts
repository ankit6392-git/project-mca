import api from "./api";

/**
 * Fetch all issues (citizen)
 */
export async function getMyIssues() {
  const res = await api.get("/issues/my");
  return res.data;
}

/**
 * Fetch all issues (admin / authority)
 */
export async function getAllIssues() {
  const res = await api.get("/issues");
  return res.data;
}
