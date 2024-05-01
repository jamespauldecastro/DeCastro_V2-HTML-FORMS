$(document).ready(function () {
    // When the 'open-cart' icon element is clicked.
    $('#open-cart').click(function () {
        $('#sidebar').show();
    });

    // When the 'close-sidebar' element is clicked.
    $('#close-sidebar').click(function () {
        $('#sidebar').hide();
    });

    // Notification handler for add to cart.
    $(".add-to-cart").click(function () {
        // Get item name.
        var itemName = $(this).data("name");
        // Show notification.
        $("#notification").text("Added to Cart: " + itemName).fadeIn();
        // Hide notification after 1 second.
        setTimeout(function () {
            $("#notification").fadeOut();
        }, 1000);
    });

    $('.add-to-cart').click(function () {
        var name = $(this).data('name');
        var price = parseFloat($(this).data('price'));
        var image = $(this).data('image');


        // Check if the item is already in the cart.
        var existingItem = $('#cart-items').find('.cart-item[data-name="' + name + '"]');
        if (existingItem.length > 0) {
            // Increment quantity of existing item.
            var quantity = parseInt(existingItem.data("quantity")) + 1;
            existingItem.data("quantity", quantity);
            existingItem.find(".quantity").text(quantity);
        } else {
            // Add new item to cart.
            var newItem = $(`
            <div class="cart-item" data-name="${name}" data-price="${price}" data-quantity="1" style="display: flex; flex-wrap: wrap; gap:10px;">
               <img src="${image}" class="item-image" alt="${name}" style="height: 80px; width: 100px; border-radius:3px;">
                 <div>
                   <span class="item-name">${name}</span>
                    <div class="quantity-controller">
                    <button class="btn btn-sm btn-secondary" onclick="decrementQuantity(this)">-</button>
                    <span class="quantity">1</span>
                    <button class="btn btn-sm btn-secondary" onclick="incrementQuantity(this)">+</button>
                </div>
                  <span class="price" style="float:right; margin-right:100px;">&#8369; ${price.toFixed(2)}</span>
                    <span>
                        <button class="delete-btn" onclick="removeItem(this)">
                            <i class="fas fa-trash-alt" style="color: #ff0000;"></i>
                        </button>
                    </span>
                </div>
            </div>`);
            $("#cart-items").append(newItem);
        }

        var totalCount = parseInt($('#cart-count').text()) + 1;
        $('#cart-count').text(totalCount);

        var totalPrice = parseFloat($('#total-price').text());
        totalPrice += price;
        $('#total-price').text(totalPrice.toFixed(2));
    });

    // When the 'checkout' element is clicked.
    $('#checkout').click(function () {
        if ($('#cart-items').children().length === 0) {
            alert('Cart is empty!');
        } else {
            window.location.href = 'order-form.html';
        }
    });

     // When the 'clear' element is clicked
    $('#clear').click(function () {
        // Implement checkout functionality here
        if ($('#cart-items').children().length === 0) {
            alert('Cart is empty!');
        } else {

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

// Function to remove an item from the cart.
function removeItem(btn) {
    var item = $(btn).closest('.cart-item'); // Use closest() to find the closest ancestor with the class 'cart-item'
    var price = parseFloat(item.data("price"));
    var quantity = parseInt(item.data("quantity"));
    var totalCount = parseInt($('#cart-count').text()) - quantity;
    $('#cart-count').text(totalCount);

    var totalPrice = parseFloat($('#total-price').text());
    totalPrice -= price * quantity;
    $('#total-price').text(totalPrice.toFixed(2));

    item.remove();
}

// Function to increment the quantity of an item in the cart.
function incrementQuantity(btn) {
    var item = $(btn).closest('.cart-item');
    var price = parseFloat(item.data("price"));
    var quantity = parseInt(item.data("quantity")) + 1;
    item.data("quantity", quantity);
    item.find(".quantity").text(quantity);

    var totalCount = parseInt($('#cart-count').text()) + 1;
    $('#cart-count').text(totalCount);

    var totalPrice = parseFloat($('#total-price').text());
    totalPrice += price;
    $('#total-price').text(totalPrice.toFixed(2));
}

// Function to decrement the quantity of an item in the cart.
function decrementQuantity(btn) {
    var item = $(btn).closest('.cart-item');
    var price = parseFloat(item.data("price"));
    var quantity = parseInt(item.data("quantity"));

    if (quantity > 1) {
        quantity--;
        item.data("quantity", quantity);
        item.find(".quantity").text(quantity);

        var totalCount = parseInt($('#cart-count').text()) - 1;
        $('#cart-count').text(totalCount);

        var totalPrice = parseFloat($('#total-price').text());
        totalPrice -= price;
        $('#total-price').text(totalPrice.toFixed(2));
    }
    else {
        return;
    }
}