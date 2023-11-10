import mongoose from "mongoose";

interface ProjectType {
  name: string;
  description: string;
  tasks: string[];
  users: string[];
}

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  tasks: {
    type: [String],
  },
  users: {
    type: [String],
  },
});

const Project = mongoose.model<ProjectType>("Project", projectSchema);

export default Project;
