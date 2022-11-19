const Item = require('../models/Item')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const getAllItems = async (req, res) => {
  const items = await Item.find({ createdBy: req.user.userId }).sort(
    'createdAt'
  )
  res.status(StatusCodes.OK).json({ items, count: items.length })
}
const getItem = async (req, res) => {
  const {
    user: { userId },
    params: { id: itemId },
  } = req
  const singleItem = await Item.findOne({
    _id: itemId,
    createdBy: userId,
  })
  if (!singleItem) {
    throw new NotFoundError(`No item with id ${itemId}`)
  }
  res.status(StatusCodes.OK).json({ singleItem })
}
const createItem = async (req, res) => {
  req.body.createdBy = req.user.userId
  const item = await Item.create(req.body)
  res.status(StatusCodes.CREATED).json({ item })
}
const updateItem = async (req, res) => {
  const {
    body: { item, recommendation },
    user: { userId },
    params: { id: ItemId },
  } = req
  if (item === '' || recommendation === '') {
    throw new BadRequestError('item and recommendation fields cannot be empty')
  }
  const updateItem = await Item.findByIdAndUpdate(
    {
      _id: ItemId,
      createdBy: userId,
    },
    req.body,
    { new: true, runValidators: true }
  )
  if (!updateItem) {
    throw new NotFoundError(`No item with id ${ItemId}`)
  }
  res.status(StatusCodes.OK).json({ updateItem })
}
const deleteItem = async (req, res) => {
  const {
    user: { userId },
    params: { id: itemId },
  } = req
  const item = await Item.findByIdAndRemove({ _id: itemId, createdBy: userId })
  if (!item) {
    throw new NotFoundError(`No item with id ${itemId}`)
  }
  res.status(StatusCodes.OK).send()
}

module.exports = { getAllItems, getItem, createItem, updateItem, deleteItem }
