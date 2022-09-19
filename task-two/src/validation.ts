/**
 * Stretch goal - Validate all the emails in this files and output the report
 *
 * @param {string[]} inputPath An array of csv files to read
 * @param {string} outputFile The path where to output the report
 */
import fs from 'fs';
import dns from 'dns';
async function validateEmailAddresses(inputPath: string[], outputFile: string) {
  let data = '';
  const validTest = fs.createReadStream(inputPath[0], { encoding: 'utf-8' });
  for await (const test of validTest) {
    data += test;
  }
  const secData = data.trim().split('\n');
  console.log(secData)
  secData.shift();

  const newFilteredEmail: Array<string> = [];
  const regx = new RegExp(
    /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    );
    for (let i = 0; i < secData.length; i++) {
      if (regx.test(secData[i])) {
        newFilteredEmail.push(secData[i]);
      }
    }
    const length2 = newFilteredEmail.length;

    //to extract the domain name

  const output = fs.createWriteStream(outputFile);
  output.write('Email' + '\n');
  for (const elem of newFilteredEmail) {
    const domains = elem.split('@')[1];

    dns.resolve(domains, 'MX', function (err, addresses) {
      if (err) {
        console.log(elem);
      } else if (addresses && addresses.length > 0) {
        output.write(elem + '\n');
      }
    });
  }
  // console.log(resolvedValidEmail)
  //console.log('Complete the implementation in src/validation.ts');
}
//console.log(validateEmailAddresses(["./fixtures/inputs/medium-sample.csv"], ""))
export default validateEmailAddresses;
