import config from "../constants/config";
import { rest } from "msw";
const { GET_JOBS_API_ENDPOINT, POST_JOB_API_ENDPOINT, APPLY_JOB_API_ENDPOINT } =
  config;

const jobs = [
  {
    _id: "6656863b0faea393fe9b3030",
    CompanyName: "zillow",
    JobTitle: "j1",
    ExperienceLevel: "12",
    Salary: "25000",
    Location: "SFO",
    Responsibilities: "Front end",
    __v: 0,
    applied: true,
  },
  {
    _id: "665686a30faea393fe9b3040",
    CompanyName: "Zillow",
    JobTitle: "Manager",
    ExperienceLevel: "Senior",
    Salary: "125000",
    Location: "sfo",
    Responsibilities: "Front end",
    __v: 0,
    applied: true,
  },
  {
    _id: "665687840faea393fe9b304a",
    CompanyName: "hotpads",
    JobTitle: "Manager",
    ExperienceLevel: "entrylevel",
    Salary: "125000",
    Location: "sfo",
    Responsibilities: "Front end",
    __v: 0,
    applied: false,
  },
  {
    _id: "665688140faea393fe9b305c",
    CompanyName: "Company2",
    JobTitle: "Manager",
    ExperienceLevel: "entrylevel",
    Salary: "125000",
    Location: "sfo",
    Responsibilities: "Front end",
    __v: 0,
    applied: false,
  },
  {
    _id: "665689919bf375d6e4e64282",
    CompanyName: "Zillow",
    JobTitle: "Manager",
    ExperienceLevel: "Senior",
    Salary: "240550",
    __v: 0,
    applied: false,
  },
  {
    _id: "66568a6d9bf375d6e4e64292",
    CompanyName: "Zillow",
    JobTitle: "Manager",
    ExperienceLevel: "Senior",
    Salary: "350000",
    __v: 0,
    applied: false,
  },
  {
    _id: "66568e149d3163e83b47bb7c",
    CompanyName: "Zoom",
    JobTitle: "Sr Engineer",
    ExperienceLevel: "Junior",
    Salary: "20000",
    __v: 0,
    applied: false,
  },
  {
    _id: "6656902b9d3163e83b47bb9e",
    CompanyName: "Zoox",
    JobTitle: "Designer",
    ExperienceLevel: "Junior",
    Salary: "23000",
    __v: 0,
    applied: false,
  },
  {
    _id: "665691f69d3163e83b47bbbe",
    CompanyName: "s",
    JobTitle: "Manager",
    ExperienceLevel: "Senioe",
    __v: 0,
    applied: false,
  },
  {
    _id: "665698e49d3163e83b47bc4c",
    CompanyName: "Zillow",
    JobTitle: "Marketing Manager",
    ExperienceLevel: "Senior",
    Salary: "25000",
    __v: 0,
    applied: false,
  },
  {
    _id: "665699979d3163e83b47bc62",
    CompanyName: "Abc tech ",
    JobTitle: "Data analyst",
    ExperienceLevel: "5",
    Salary: "80000",
    __v: 0,
    applied: false,
  },
  {
    _id: "66569a899d3163e83b47bc6a",
    CompanyName: "Apple",
    JobTitle: "Data engineer ",
    ExperienceLevel: "6",
    Salary: "125000",
    __v: 0,
    applied: false,
  },
];
const handlers = [
  rest.get(GET_JOBS_API_ENDPOINT, (req, res, ctx) => {
    return res(ctx.json(jobs));
  }),

  rest.post("/apply-job", (req, res, ctx) => {
    // Mock response for applying to a job
    return res(ctx.json({ success: true }));
  }),
];

export { handlers };
