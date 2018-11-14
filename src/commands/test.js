exports.meta = {
      desc: "A simple test command for debugging.",
      module: "Core"
};

  exports.fn =  function (client, messsage) {
    console.log("it works");
}
