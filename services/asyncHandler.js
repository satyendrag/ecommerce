const ayncHandler = (fn) => async (req, res, next) => {
  try {
    fn(req, res, next);
  } catch (err) {
    res.status(err.code || 500).json({
      success: false,
    });
  }
};

export default ayncHandler;

// function asyncHandler(fn) {
//   return async function (req, res, next) {
//     try {
//       await fn(req, res, next);
//     } catch (err) {
//       res.status(err.code || 500).json({
//         success: false,
//       });
//     }
//   };
// }
