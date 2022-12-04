const fetchPathname = (pathnameNumber) => {
  return window.location.pathname.split("/")[pathnameNumber];
};

export default fetchPathname;
