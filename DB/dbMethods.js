export const findByIdDocument = async (modelName, docId) => {
  const isDocumentExisted = await modelName.findById({ _id: docId })
  if (!isDocumentExisted) {
    return {
      message: `No Document is found`,
      status: 404,
      success: false,
      result: null,
    }
  }
  return {
    message: 'Document has been found',
    status: 200,
    success: true,
    result: isDocumentExisted,
  }
}

export const findOneDocument = async (modelName, query) => {
  const isDocumentExisted = await modelName.findOne(query)
  if (!isDocumentExisted) {
    return {
      message: `No Document is found`,
      status: 404,
      success: false,
      result: null,
    }
  }

  return {
    message: 'Document has been found',
    status: 200,
    success: true,
    result: isDocumentExisted,
  }
}

export const createDocument = async (modelName, query) => {
  const newDocument = await modelName.create(query)
  if (!newDocument) {
    return {
      message: `No Document has been created`,
      status: 500,
      success: false,
      result: null,
    }
  }
  return {
    message: `Document has been created`,
    status: 201,
    success: true,
    result: newDocument,
  }
}

export const deleteOneDocument = async (modelName, query) => {
  const deleteDocument = await modelName.deleteOne(query)
  if (!deleteDocument.deletedCount) {
    return {
      message: `No Document has been deleted`,
      status: 500,
      success: false,
      result: null,
    }
  }
  return {
    message: `Document has been deleted`,
    status: 200,
    success: true,
    result: deleteDocument,
  }
}

export const findByIdAndUpdateDocument = async (modelName, query, newData) => {
  const updateDocument = await modelName.findByIdAndUpdate(query, newData, {
    new: true,
  })
  if (!updateDocument) {
    return {
      message: `No Document has been updated`,
      status: 500,
      success: false,
      result: null,
    }
  }
  return {
    message: `Document has been updated`,
    status: 200,
    success: true,
    result: updateDocument,
  }
}
export const findByIdAndDeleteDocument = async (modelName, docId) => {
  const isDocumentExisted = await modelName.findByIdAndDelete({ _id: docId })
  if (!isDocumentExisted) {
    return {
      message: `No Document is found`,
      status: 404,
      success: false,
      result: null,
    }
  }
  return {
    message: 'Document has been found',
    status: 204,
    success: true,
    result: null,
  }
}
export const findDocuments = async (modelName, query) => {
  const documents = await modelName.find(query).sort({ createdAt: -1 })
  if (!documents.length) {
    return {
      message: `No Document has been found`,
      status: 200,
      success: true,
      result: null,
    }
  }
  return {
    message: `Documents`,
    status: 200,
    success: true,
    result: documents,
  }
}
