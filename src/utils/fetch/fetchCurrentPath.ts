const fetchPathname = (pathnameNumber: number) => {
  return window.location.pathname.split("/")[pathnameNumber];
};

export default fetchPathname;
