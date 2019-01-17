export const extractDefinedProperties = obj => {
    console.log('obj = ', obj);

    const objWithDefinedProperties = Object.entries(obj).reduce(
        (objWithDefinedProperties, [key, value]) => {
            if (value !== undefined) objWithDefinedProperties[key] = value;
            return objWithDefinedProperties;
        },
        {}
    );

    console.log('objWithDefinedProperties = ', objWithDefinedProperties);
    return Object.keys(objWithDefinedProperties).length > 0 && objWithDefinedProperties;
};
