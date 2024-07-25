import allAmenities from '@/utils/amenitiesList';

const AmenitiesList = ({ currentAmenities = [] }) => {
  return Object.keys(allAmenities).map((name, index) => {
    let isChecked = false;

    if (currentAmenities.length > 0) {
      isChecked = currentAmenities.includes(name);
    }

    return (
      <div key={index}>
        <input
          type='checkbox'
          id={`amenity_${allAmenities[name]}`}
          name='amenities'
          value={name}
          className='mr-2'
          defaultChecked={isChecked}
        />
        <label htmlFor={`amenity_${allAmenities[name]}`}>{name}</label>
      </div>
    );
  });
};
export default AmenitiesList;
