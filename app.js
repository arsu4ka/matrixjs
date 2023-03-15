function generateMatrix() {
    // Get rows and columns inputs
    var rows = parseInt(document.getElementById("rows").value);
    var cols = parseInt(document.getElementById("cols").value);

  // Check if inputs are valid
    if (isNaN(rows) || isNaN(cols)) {
        // Display error message
        document.getElementById("error").style.display = "block";
        document.getElementById("error").innerHTML = "Please enter valid numbers";
    } else {
        // Hide error message
        document.getElementById("error").style.display = "none";

        const rows = document.getElementById("rows").value;
        const cols = document.getElementById("cols").value;
        let matrix = "";
        matrixGlobal = []

        for (let i = 0; i < rows; i++) {
            matrix += "<tr>";
            let row = []
            for (let j = 0; j < cols; j++) {
                let elem = Math.floor(Math.random() * 100)
                row.push(elem)
                matrix += `<td>${elem}</td>`;
            }
            matrix += "</tr>";
            matrixGlobal.push(row)
        }
        document.getElementById("matrix").innerHTML = matrix;
    }
}

function determinant(matrix) {
    // Check if the matrix is square
    if (matrix.length !== matrix[0].length) {
      throw new Error("Matrix must be square");
    }
  
    // Base case for 2x2 matrix
    if (matrix.length === 2 && matrix[0].length === 2) {
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }
  
    let det = 0;
    for (let i = 0; i < matrix.length; i++) {
      // Create a submatrix by removing the first row and i-th column
      const submatrix = matrix.slice(1).map(row => row.filter((_, j) => j !== i));
  
      // Calculate the determinant of the submatrix recursively
      const subdet = determinant(submatrix);
  
      // Add or subtract the product of the i-th element and the subdeterminant
      det += (i % 2 === 0 ? 1 : -1) * matrix[0][i] * subdet;
    }
  
    return det;
}

function calculateDeterminant() {
    document.getElementById("error").style.display = "block";
    try {
        det = determinant(matrixGlobal)
        document.getElementById("error").innerHTML = `Determinant: ${det}`;
    } catch (error) {
        document.getElementById("error").innerHTML = `Matrix must be a square`;        
    }
}

function findHighestElement() {
    let max =  matrixGlobal[0][0]
    matrixGlobal.forEach((row) => {
        row.forEach((num) => {
            if (num > max) {
                max = num
            }
        })
    })
    document.getElementById("error").style.display = "block";
    document.getElementById("error").innerHTML = `Highest element: ${max}`;
}

function saveMatrixToFile() {
    // Create a blob object with the matrix data
    const matrixData = matrixGlobal.map(row => row.join("\t")).join("\n");
    const blob = new Blob([matrixData], {type: "text/plain"});

    // Create a link element and click it to initiate the download
    const link = document.createElement("a");
    link.download = "matrix.txt";
    link.href = URL.createObjectURL(blob);
    link.click();
}  

let matrixGlobal = []
document.getElementById("generate-btn").addEventListener("click", generateMatrix)
document.getElementById("det-btn").addEventListener("click", calculateDeterminant)
document.getElementById("highest-btn").addEventListener("click", findHighestElement)
document.getElementById("save-file-btn").addEventListener("click", saveMatrixToFile);
