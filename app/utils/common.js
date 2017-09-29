exports.pageFormat = function (page, maxPage) {
  page = parseInt(page)
  if (isNaN(page) || page < 1) return 1
  return page > maxPage ? maxPage : page
}
