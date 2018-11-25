exports.meta = {
      name: "test",
      desc: "A simple test command for debugging.",
      module: "Core",
      enabled: false
};

  exports.fn =  function (client, message) {
    console.log("it works");
    return;
}
