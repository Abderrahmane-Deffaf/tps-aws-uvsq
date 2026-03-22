

export async function getHeaders(req, res) {

  return res.send(
    `${Object.entries(req.cookies)
      .map(([key, value]) => `${key}: ${value}`)
      .join("<br>")}` +
      "<br> <br>" +
      `${Object.entries(req.headers)
        .map(([key, value]) => `${key}: ${value}`)
        .join("<br>")}`,
  );
}