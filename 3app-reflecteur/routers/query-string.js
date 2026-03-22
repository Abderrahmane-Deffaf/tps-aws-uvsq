


export async function queryString(req, res) {

  let jours = {
    mon: "Lundi",
    tue: "Mardi",
    wed: "Mercredi",
    thu: "Jeudi",
    fri: "Vendredi",
    sat: "Samedi",
    sun: "Dimanche",
  };

  const queryParams = req.query;

  const hiddenParams = req._parsedUrl.query;
  console.log("hiddenParams:", hiddenParams);

  return res.send(
    `
    Hello <br> World! <br> <br>  
    ${Object.entries(queryParams)
      .map(([key, value]) => `${key}: ${value}`)
      .join("<br>")}
      <br> <br>
      Parsed Query: ${hiddenParams} <br> <br>
    ${Object.entries(jours)
      .map(([key, value]) => `${key}: ${value}`)
      .join("<br>")}
    `,
  );
}