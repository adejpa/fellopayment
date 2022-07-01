$(document).ready(function() {
  showSkeleton({
    status: true,
    length: 3
  });
  setTimeout(() => {
    showSkeleton({
      status: false
    });
  }, 3000);

  $(".data-list").on("click", ".data-content", function() {
    const no = "08"+Math.floor(Math.random() * 10);
    const noHp = no.slice(0, 5) + "xxxxx";
    const dataId = $(this).attr("data-id");

    if ($(this).hasClass("not-connected")) {
      showSkeleton({
        status: true,
        balance: true,
        indexParam: $(this).index(".data-content")
      });

      setTimeout(() => {
        showSkeleton({
          status: false
        });
        showConnected({
          parent: $(this),
          status: true,
          value: noHp
        });
      }, 3000);
    } else {
      if (dataId == 1) {
        window.location.href = "detail-fello.html";
      } else if (dataId == 2) {
        window.location.href = "detail-dana.html";
      } else {
        window.location.href = "detail-doku.html";
      }
    }
  });
});

const skeletonTpl = `
  <li class="skeleton-item">
    <div class="skeleton-card w-100">
      <div class="skeleton-image skeleton-loading d-flex align-items-center"></div>
      <div class="skeleton-text flex-fill d-flex flex-column justify-content-center">
        <span class="skeleton-title skeleton-loading"></span>
        <span class="skeleton-desc skeleton-loading"></span>
      </div>
      <div class="flex-fill d-flex align-items-center justify-content-end">
        <span class="skeleton-balance skeleton-loading d-none"></span>
      </div>
      <div class="skeleton-arrow d-flex align-items-center">
        <img src="assets/img/ic-chevron-right@2x.png" class="chevron-right" alt="chevron-right" />
      </div>
    </div>
  </li>
`;

const showSkeleton = ({
  status,
  length = 3,
  balance = false,
  indexParam = 0
}) => {
  if (status) {
    for (let i = 0; i < length; i++) {
      $(".skeleton-list").append(skeletonTpl);
    }
    showBalance(balance);
    $(".skeleton-list").removeClass("d-none");
    $(".data-list").addClass("d-none");
  } else {
    $(".skeleton-list").addClass("d-none");
    $(".data-list").removeClass("d-none");
    $(".skeleton-item").remove();
  }
};

const showBalance = (status) => {
  if (status) {
    $(".data-content").each(function(e) {
      if (!$(this).hasClass("not-connected")) {
        $(".skeleton-item")
          .eq(e)
          .find(".skeleton-balance")
          .removeClass("d-none");
      }
    });
  } else {
    $(".data-content").each(function(e) {
      if (!$(this).hasClass("not-connected")) {
        $(".skeleton-item")
          .eq(e)
          .find(".skeleton-balance")
          .addClass("d-none");
      }
    });
  }
}

const showConnected = ({
  parent,
  status,
  value
}) => {
  if (status) {
    $(parent).removeClass("not-connected");
    $(parent).find(".balance-item").removeClass("d-none");
    $(parent).find(".desc-item").addClass("text-dark");
    $(parent).find(".desc-item").text(value);
  } else {
    $(parent).addClass("not-connected");
    $(parent).find(".balance-item").addClass("d-none");
    $(parent).find(".desc-item").removeClass("text-dark");
    $(parent).find(".desc-item").text("Hubungkan akun");
  }
}