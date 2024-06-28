// Return formatted phone number in (XXX) XXX-XXXX format. Setup for US numbers only, allowing for country code from autofill.
export default function getFormattedPhone(number) {
  if ( (number.length < 10) || ( number.length > 12 ) ) {
    throw new Error("[source: getFormattedPhone.js]", '\n', "Phone number isn't valid. Length of number: ", number.length);
  }

  return number
    .replace(/\D/g, '')
    .replace(/(\d*)(\d{3})(\d{3})(\d{4})$/, (s, a, b, c, d) => `+${a} (${b}) ${c}-${d}`)
    .replace(/\+(1\b|\s)\s*/, '');
};
