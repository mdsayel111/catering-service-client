// // Convert to Date object
// const date = new Date(isoDate);

// // Format (e.g. 22 Sep 2025)
// const formatted = date.toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
// });
const formatDate = (date) => {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate();
    const month = formattedDate.getMonth() + 1;
    const year = formattedDate.getFullYear();
    return `${day}/${month}/${year}`;
};
export default formatDate;