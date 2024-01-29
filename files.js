const fs = require("fs");

// Reading files

fs.readFile("./docs/blog1.txt", (err, data) => {
    if(err) {
        console.log(err);
    }
    console.log(data.toString());
})

console.log("Last line");

// Writing files

fs.writeFile("./docs/blog2.txt", "Hello, Ninja!", () => {
    console.log("File was written.");
})


// Directories

if (!fs.existsSync("./assets")) {
  fs.mkdir("./assets", (err) => {
    if (err) {
      console.log("Folder created.");
    }
  });
} else {
  fs.rmdir("./assets", (err) => {
    if (err) {
      console.log(err);
    }

    console.log("Folder deleted.");
  });
}


// Deleting files

if(fs.existsSync("./docs/deleteme.txt")){
    fs.unlink("./docs/deleteme.txt", (err) => {
        if(err){
            console.log(err);
        }
    })

    console.log("File deleted.");
}