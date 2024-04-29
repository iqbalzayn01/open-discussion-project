const Threads = require('../../api/v1/threads/model');
const { BadRequestError } = require('../../errors');
const { checkingUsers } = require('./users');

const createThreads = async (req, res) => {
  const { title, body, category, userID, upVotesBy, downVotesBy } = req.body;

  await checkingUsers(userID);

  if (!title || !body || !category || !userID) {
    throw new BadRequestError('Title, body, category, & userID are required');
  }

  const result = await Threads.create({
    title,
    body,
    category,
    userID,
    upVotesBy,
    downVotesBy,
  });

  return result;
};

const getAllThreads = async (req) => {
  const { keyword, userID } = req.query;
  let condition = {};

  if (keyword) {
    condition = { ...condition, title: { $regex: keyword, $options: 'i' } };
  }

  if (userID) {
    condition = { ...condition, userID: userID };
  }

  const result = await Threads.find(condition).populate({
    path: 'userID',
    select: '_id name email avatar role',
  });

  return result;
};

const getOneThreads = async (req) => {
  const { id } = req.params;

  const result = await Threads.findOne({ _id: id }).populate({
    path: 'userID',
    select: '_id name email avatar role',
  });

  if (!result) throw new NotFoundError(`Tidak ada threads dengan id :  ${id}`);

  return result;
};

const updateThreads = async (req) => {
  const { id } = req.params;
  const { title, body, category } = req.body;

  const result = await Threads.findOneAndUpdate(
    { _id: id },
    { title, body, category },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError(`Tidak ada Threads dengan id :  ${id}`);

  return result;
};

const deleteThreads = async (req) => {
  const { id } = req.params;

  const result = await Threads.findOne({
    _id: id,
  });

  if (!result) throw new NotFoundError(`Tidak ada Threads dengan id :  ${id}`);

  await result.deleteOne({ _id: id });

  return result;
};

const checkingThreads = async (id) => {
  const result = await Threads.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada threads dengan id :  ${id}`);

  return result;
};

module.exports = {
  createThreads,
  getAllThreads,
  getOneThreads,
  updateThreads,
  deleteThreads,
  checkingThreads,
};
