const roundByDecimal = (value, decimal) => Math.round(value * `1e${decimal}`) / `1e${decimal}`;

export default roundByDecimal;
