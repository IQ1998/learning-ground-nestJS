/**
 * @author AnGL
 * @description This is a non pure function that will modify toBeUpdated,
 */
function updatePatchStyle(
  toBeUpdated: Record<string, any>,
  updatePayload: Record<string, any>,
) {
  const updateKeys = Object.keys(updatePayload);
  updateKeys.forEach((key) => {
    if (toBeUpdated.hasOwnProperty(key)) {
      toBeUpdated[key] = updatePayload[key];
    }
  });
}

export default {
  updatePatchStyle,
};
