/* =========================================================
   Greenfield Comprehensive School — Main Script
   Handles: navbar active link, admission wizard, mock login,
   fee/receipt demo, print, and simple form validation.
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Highlight active nav link based on current page ---------- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-navbar .nav-link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && href.split('#')[0] === currentPage) {
      link.classList.add('active');
    }
  });

  /* ---------- Bootstrap form validation (all forms with .needs-validation) ---------- */
  document.querySelectorAll('.needs-validation').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });

  /* =========================================================
     ADMISSION FORM — MULTI-STEP WIZARD
     ========================================================= */
  var wizard = document.getElementById('admissionWizard');
  if (wizard) {
    var steps = wizard.querySelectorAll('.form-step-panel');
    var stepIndicators = document.querySelectorAll('#formStepsNav li');
    var currentStep = 0;

    function showStep(index) {
      steps.forEach(function (panel, i) {
        panel.classList.toggle('active-step', i === index);
      });
      stepIndicators.forEach(function (li, i) {
        li.classList.toggle('active', i === index);
        li.classList.toggle('done', i < index);
      });
      window.scrollTo({ top: wizard.offsetTop - 100, behavior: 'smooth' });
    }

    wizard.querySelectorAll('.btn-next-step').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var activePanel = steps[currentStep];
        var inputs = activePanel.querySelectorAll('input[required], select[required], textarea[required]');
        var valid = true;
        inputs.forEach(function (input) {
          if (!input.checkValidity()) {
            input.reportValidity();
            valid = false;
          }
        });
        if (!valid) return;
        if (currentStep < steps.length - 1) {
          currentStep++;
          showStep(currentStep);
        }
      });
    });

    wizard.querySelectorAll('.btn-prev-step').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (currentStep > 0) {
          currentStep--;
          showStep(currentStep);
        }
      });
    });

    var admissionForm = document.getElementById('admissionForm');
    if (admissionForm) {
      admissionForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var successModalEl = document.getElementById('admissionSuccessModal');
        if (successModalEl) {
          var modal = new bootstrap.Modal(successModalEl);
          modal.show();
        }
        admissionForm.reset();
        currentStep = 0;
        showStep(0);
      });
    }

    showStep(0);
  }

  /* ---------- Upload box preview (Admission) ---------- */
  document.querySelectorAll('.upload-input').forEach(function (input) {
    input.addEventListener('change', function () {
      var target = document.querySelector('[data-upload-preview="' + input.dataset.uploadTarget + '"]');
      if (target && input.files.length) {
        target.textContent = 'Selected: ' + input.files[0].name;
        target.classList.add('text-emerald', 'fw-semibold');
      }
    });
  });

  /* =========================================================
     STUDENT PORTAL — RESULT CHECKER (mock)
     ========================================================= */
  var resultForm = document.getElementById('resultCheckerForm');
  if (resultForm) {
    resultForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!resultForm.checkValidity()) {
        resultForm.classList.add('was-validated');
        return;
      }
      document.getElementById('resultLoginPanel').classList.add('d-none');
      document.getElementById('resultCardPanel').classList.remove('d-none');
      var idVal = document.getElementById('studentIdInput').value;
      var sessionVal = document.getElementById('sessionInput').value;
      var termVal = document.getElementById('termInput').value;
      document.getElementById('resultStudentId').textContent = idVal;
      document.getElementById('resultSession').textContent = sessionVal;
      document.getElementById('resultTerm').textContent = termVal;
      window.scrollTo({ top: document.getElementById('resultCardPanel').offsetTop - 100, behavior: 'smooth' });
    });
  }
  var backToLoginBtn = document.getElementById('backToResultLogin');
  if (backToLoginBtn) {
    backToLoginBtn.addEventListener('click', function () {
      document.getElementById('resultCardPanel').classList.add('d-none');
      document.getElementById('resultLoginPanel').classList.remove('d-none');
    });
  }

  /* =========================================================
     PARENT PORTAL — LOGIN + FEE PAYMENT + RECEIPT
     ========================================================= */
  var parentLoginForm = document.getElementById('parentLoginForm');
  if (parentLoginForm) {
    parentLoginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      document.getElementById('parentLoginPanel').classList.add('d-none');
      document.getElementById('parentDashboardPanel').classList.remove('d-none');
    });
  }

  var payFeesForm = document.getElementById('payFeesForm');
  if (payFeesForm) {
    payFeesForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!payFeesForm.checkValidity()) {
        payFeesForm.classList.add('was-validated');
        return;
      }
      var regNo = document.getElementById('feeRegNo').value;
      var term = document.getElementById('feeTerm').value;
      document.getElementById('receiptRegNo').textContent = regNo;
      document.getElementById('receiptTerm').textContent = term;
      var receiptModalEl = document.getElementById('receiptModal');
      var modal = new bootstrap.Modal(receiptModalEl);
      modal.show();
    });
  }

  /* ---------- Print Receipt ---------- */
  document.querySelectorAll('.btn-print-receipt').forEach(function (btn) {
    btn.addEventListener('click', function () {
      window.print();
    });
  });

  /* =========================================================
     STAFF PORTAL — LOGIN (mock)
     ========================================================= */
  var staffLoginForm = document.getElementById('staffLoginForm');
  if (staffLoginForm) {
    staffLoginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      document.getElementById('staffLoginPanel').classList.add('d-none');
      document.getElementById('staffDashboardPanel').classList.remove('d-none');
    });
  }

});
