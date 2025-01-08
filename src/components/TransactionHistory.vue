<script setup lang="ts">
import $ from "jquery";
// import * as jQuery from "jquery";
// import DataTable from 'datatables.net-dt';
import 'datatables.net-bs5';
import 'datatables.net-responsive-bs5';
import 'datatables.net-scroller-bs5';
import 'datatables.net-buttons-bs5';
import 'datatables.net-buttons/js/buttons.html5.mjs';
import 'datatables.net-buttons/js/buttons.print.mjs';
import 'datatables.net-select-bs5';

interface Transaction {
  icon: string
  amount: number
  transaction_id: string
  date: string
  status: string
}
const columns = [
  {data: 'icon'},
  {
    data: 'amount',
    render: function (data: Transaction , type: string, row: Transaction) {
      return `<span class="text-habahaba-800">${data}</span>`
    }
  },
  {data: 'transaction_id'},
  {data: 'date'} ,
  {data: 'status'}
]

const exemptedColumns = Array.from({length: columns.length-2}, (v, k) => k + 1)


$(document).ready(function() {
  $('#myTable').DataTable({
    buttons: [
      {
        extend: 'csv',
        className: 'bg-transparent text-black border-habahaba-800'
      },
      {
        extend: 'print',
        className: 'bg-transparent text-black border-habahaba-800',
        exportOptions: {
          columns:  exemptedColumns
        }
      },
      {
        extend: 'pdf',
        className: 'bg-transparent text-black border-habahaba-800',
        exportOptions: {
          columns: exemptedColumns
        }
      },
      {
        extend: 'excel',
        className: 'bg-transparent text-black border-habahaba-800',
        exportOptions: {
          columns: exemptedColumns
        }
      }
    ],
    dom: '<"d-flex align-content-center justify-content-between"<"w-1/3"l><"w-1/3 text-center"B><"w-1/3 text-right"f>>rt<"flex justify-between pt-4"<"w-1/2"i><"flex justify-end w-1/2"p>>',
  });
});


</script>

<template>
  <div>
    <table id="myTable" class="display">
      <thead>
      <tr>
        <th></th>
        <th>Amount</th>
        <th>Transaction ID</th>
        <th>Status</th>
        <th>Date</th>
      </tr>
      </thead>
      <tbody class="text-sm">
      <tr class="">
        <td>  <div
          class="bg-habahaba-100 rounded-circle d-flex justify-content-center align-items-center"
          style="width: 30px; height: 30px"
        >
              <span class="material-icons text-habahaba-800">
                mobile_screen_share
              </span>
        </div></td>
        <td>3,000</td>
        <td>PK12458SU</td>
        <td>
          <div class="d-flex bg-green-soft rounded-pill  px-2">
            <span class="material-icons text-success">done</span>
            <span class="text-success">Success</span>
          </div>
        </td>
        <td>12/10/2024</td>
      </tr>
      </tbody>
    </table>
  </div>



</template>

<style scoped>
.btn-csv {
  color: #0dcaf0;

}

</style>
