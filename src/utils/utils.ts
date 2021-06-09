export function convertToBase64(file: File): any {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export async function convertToImage(file: File): Promise<any> {
  let result;
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    result = reader.result;
  };
  console.log(111, await result);
  return result;
}
