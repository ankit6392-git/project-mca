export type IssueStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED";

export type Issue = {
  id: string;
  title: string;
  description: string;
  status: IssueStatus;
};
