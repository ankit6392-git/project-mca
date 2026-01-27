export type IssueStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED";

export type Issue = {
  id: string;
  title: string;
  description: string;
  status: IssueStatus;
};

department: {
  type: String,
  required: true, // road, water, electricity
},

location: {
  lat: Number,
  lng: Number,
},
