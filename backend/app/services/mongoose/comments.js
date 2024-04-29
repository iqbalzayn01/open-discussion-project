const Comments = require('../../api/v1/comments/model');
const { BadRequestError } = require('../../errors');
const { checkingUsers } = require('./users');

const createComments = async (req, res) => {
  const { content, upVotesBy, downVotesBy, owner } = req.body;

  await checkingUsers(owner);

  if (!content || !owner) {
    throw new BadRequestError('content & owner are required');
  }

  const result = await Comments.create({
    content,
    upVotesBy,
    downVotesBy,
    owner,
  });

  return result;
};

const getAllComments = async (req) => {
  const { keyword, userID } = req.query;
  let condition = {};

  if (keyword) {
    condition = { ...condition, title: { $regex: keyword, $options: 'i' } };
  }

  if (userID) {
    condition = { ...condition, userID: userID };
  }

  const result = await Comments.find(condition).populate({
    path: 'userID',
    select: '_id name email avatar role',
  });

  return result;
};

const updateComments = async (req) => {
  const { id } = req.params;
  const { title, body, category } = req.body;

  const result = await Comments.findOneAndUpdate(
    { _id: id },
    { title, body, category },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError(`Tidak ada Comments dengan id :  ${id}`);

  return result;
};

const deleteComments = async (req) => {
  const { id } = req.params;

  const result = await Comments.findOne({
    _id: id,
  });

  if (!result) throw new NotFoundError(`Tidak ada Comments dengan id :  ${id}`);

  await result.deleteOne({ _id: id });

  return result;
};

module.exports = {
  createComments,
  getAllComments,
  updateComments,
  deleteComments,
};
