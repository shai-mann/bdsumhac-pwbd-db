import { historyModel } from "./models.js";

export const findAllEdits = () => historyModel.find();

export const findEditsByFacility = (id) => historyModel.find({ facility: id });

export const createEdit = (edit) =>
  historyModel.create({ ...edit, time: new Date() });

export const deleteFacility = (id) => historyModel.deleteOne({ _id: id });
