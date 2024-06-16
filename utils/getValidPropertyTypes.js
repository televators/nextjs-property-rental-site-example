import { models } from 'mongoose';

const getValidPropertyTypes = () => {
  try {
    const validPropertyTypes = models.Property.schema.path('type').enumValues;

    console.log(validPropertyTypes);

    return validPropertyTypes;
  } catch (error) {
    console.error('Error fetching property types from Property schema.', error);

    return;
  }
};

export default getValidPropertyTypes;
