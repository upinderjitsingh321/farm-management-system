const recordsFetch = (page_no, number_of_rows) => {
    let pageNumber;
    let recordsPerPage;

    !page_no ? pageNumber = 1 : pageNumber = Number(page_no);
    !number_of_rows ? recordsPerPage = 10 : recordsPerPage = Number(number_of_rows);

    let skipRecords = (pageNumber - 1) * recordsPerPage;

    if (page_no === "0") {
        recordsPerPage = 0;
        skipRecords = 0
    }

    return { skipRecords, recordsPerPage }
}

module.exports = {
    recordsFetch
}