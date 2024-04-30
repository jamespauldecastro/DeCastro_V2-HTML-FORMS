$(document).ready(function () {
    $('#open-cart').click(function () {
        $('#sidebar').show();
    });

    $('#close-sidebar').click(function () {
        $('#sidebar').hide();
    });

    $('.add-to-cart').click(function () {
        var name = $(this).data('name');
        var price = parseFloat($(this).data('price'));

        var item = $('<div class="cart-item">' + name + ' - &#8369; ' + price.toFixed(2) + '<button class="delete-btn" onclick="removeItem(this)">Remove</button></div>');
        $('#cart-items').append(item);

        var totalCount = parseInt($('#cart-count').text()) + 1;
        $('#cart-count').text(totalCount);

        var totalPrice = parseFloat($('#total-price').text());
        totalPrice += price;
        $('#total-price').text(totalPrice.toFixed(2));
    });

    $('#checkout').click(function () {
        // Implement checkout functionality here
        if ($('#cart-items').children().length === 0) {
            alert('Cart is empty!');
        }
        else {
            window.location.href = 'order-form.html';
        }
    });

    $('#clear').click(function () {
        // Implement checkout functionality here
        if ($('#cart-items').children().length === 0) {
            alert('Cart is empty!');
        }
        else {

            var confirmation = confirm("Clear all items from the cart?");
    
            // Check user's choice
            if (confirmation) {
                // User clicked "Yes", clear the cart
                $('#cart-items').empty(); // Remove all child elements from the cart
                $('#total-price').text('0'); // Reset the total price to 0
                $('#cart-count').text('0'); // Reset the cart count to 0
            }
        }
    });
});

function removeItem(btn) {
    var item = $(btn).parent();
    var price = parseFloat(item.text().split(' - ')[1].replace('₱ ', ''));
    var totalCount = parseInt($('#cart-count').text()) - 1;
    $('#cart-count').text(totalCount);

    var totalPrice = parseFloat($('#total-price').text());
    totalPrice -= price;
    $('#total-price').text(totalPrice.toFixed(2));

    item.remove();
}