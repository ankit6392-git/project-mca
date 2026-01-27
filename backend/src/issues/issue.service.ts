type Issue = {
  id: string;
  title: string;
  description: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED";
};

const issues: Issue[] = [];

export class IssueService {
  static getAll() {
    return issues;
  }

  static create(data: Omit<Issue, "id" | "status">) {
    const issue: Issue = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      status: "OPEN",
    };

    issues.push(issue);
    return issue;
  }
}
