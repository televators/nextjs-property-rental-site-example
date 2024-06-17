import * as mongoose from 'mongoose';
// import Property from "@/models/Property";

const getValidPropertyTypes = () => {
  try {
    const Property = mongoose.model('Property');
    const validPropertyTypes = Property.schema.path('type').enumValues;
    // const validPropertyTypes = await Property.schema.path('type').enumValues;

    return validPropertyTypes;
  } catch (error) {
    console.log("---=== Inside the util function's catch block ===---");
    console.error('Error fetching property types from Property schema.', error);

    return;
  }
};

export default getValidPropertyTypes;
