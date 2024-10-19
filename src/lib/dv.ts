export const validateRUT = (rut: string) => {
  // Eliminar puntos y guión del RUT
  const cleanRUT = rut.replace(/[.-]/g, "");

  // Separar el número del dígito verificador
  const rutNumber = cleanRUT.slice(0, -1);
  const givenDV = cleanRUT.slice(-1).toLowerCase();

  // Validar que el número sea numérico
  if (!/^\d+$/.test(rutNumber)) return false;

  // Calcular dígito verificador
  let total = 0;
  let multiplier = 2;
  for (let i = rutNumber.length - 1; i >= 0; i--) {
    total += parseInt(rutNumber[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const remainder = total % 11;
  const computedDV = 11 - remainder === 11 ? "0" : 11 - remainder === 10 ? "k" : (11 - remainder).toString();

  // Comparar el dígito verificador calculado con el dado
  return computedDV === givenDV;
};
