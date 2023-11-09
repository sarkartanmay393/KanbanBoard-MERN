"use strict";
// import { ReqType, ResType } from "../types/index";
// import Project from "../models/Project";
// const createProject = async (req: ReqType, res: ResType) => {
//   const { name, description, tasks, users } = req.body;
//   try {
//     const project = new Project({
//       name,
//       description,
//       tasks,
//       users,
//     });
//     const savedProject = await project.save();
//     return res.json(savedProject.id);
//   } catch (error) {
//     return res.json(error);
//   }
// };
// const updateProject = async (req: ReqType, res: ResType) => {
//   const { id } = req.params;
//   console.log(req.params);
//   const { title, description, labels, tags } = req.body;
//   if (!id) {
//     return res.json(`Error: no Project id was passed`);
//   }
//   try {
//     const updatedProject = await Project.findByIdAndUpdate(id, {
//       title,
//       description,
//       labels,
//       tags,
//     });
//     if (!updateProject) {
//       return res.json(`Error: couldn't find the Project`);
//     }
//     return res.json(updateProject);
//   } catch (error) {
//     return res.json(error);
//   }
// };
// const deleteProject = async (req: ReqType, res: ResType) => {
//   const { id } = req.body;
//   if (!id) {
//     return res.json(`Error: no Project id was passed`);
//   }
//   try {
//     const deletedProject = await Project.findByIdAndDelete({ _id: id });
//     if (!deletedProject) {
//       return res.json(`Error: couldn't find the Project`);
//     }
//     return res.json(deletedProject);
//   } catch (error) {
//     return res.json(error);
//   }
// };
// const allProject = async (req: ReqType, res: ResType) => {
//   const Projects = await Project.find({});
//   return res.json(Projects);
// };
// export { createProject, updateProject, deleteProject, allProject };
