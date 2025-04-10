import axios from 'axios';

const apiCall = (url, method='GET', body=null, headers=null) =>
  axios(url, { method, data: body, headers })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err)
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        window.location.href = '/';
        return;
      }
      throw err; 
    });

    
export const fetchCollabInformation = (username) =>
  apiCall(`/api/collabs/info/${username}`);
export const fetchAllCollabs = () => apiCall(`/api/collabs/all`);
export const fetchCollabsResume = () => apiCall(`/api/collabs/resume`);
export const fetchAllMembers = () => apiCall(`/api/mag/all`);
export const fetchActiveMembers = () => apiCall(`/api/mag/active`);
export const fetchMemberRenewalNotifications = () =>
  apiCall(`/api/mag/renewalNotifications`);
export const fetchMember = (username) => apiCall(`/api/members/${username}`);
export const fetchMemberStatus = (username) =>
  apiCall(`/api/members/status/${username}`);

    
export const fetchThesis = () => apiCall('/api/theses');
export const fetchThesisAreas = () => apiCall('/api/areas');
export const fetchElections = () => apiCall('/api/elections');
export const fetchAdminElections = () => apiCall(`/api/admin/elections`);
export const removeCollab = (username) => apiCall(`/api/collabs/remove/${username}`, 'POST');
export const addCollab = (username, info) => apiCall(`/api/collabs/add/${username}`, 'POST', info);
export const updateEmail = (username, email) => apiCall(`/api/mag/update/email/${username}`, 'POST', {changedEmail: email});
export const updateMember = (username, { name, email, courses }) =>
  apiCall(`/api/members/${username}`, 'PUT', { name, email, courses });
export const deleteMagMember = (username) =>
  apiCall(`/api/mag/delete/${username}`, 'PUT');
export const warnMember = (username) =>
  apiCall(`/api/mag/warnedMember/${username}`, 'POST');
export const createArea = (data) =>
  apiCall(`/api/areas`, 'POST', data, { 'Content-Type': 'multipart/form-data' });
export const createElection = (election) =>
  apiCall(`/api/elections`, 'POST', election);
export const createThesis = (thesis) =>
  apiCall(`/api/theses`, 'POST', thesis, { 'Content-Type': 'multipart/form-data' });
export const createMember = (member) =>
  apiCall(`/api/members`, 'POST', member);
export const voteElection = (electionId, vote) =>
  apiCall(`/api/elections/${electionId}/votes`, 'POST', vote);

// Store endpoints
export const fetchProducts = async () => {
  try {
    const response = await apiCall("/api/store/products");

    // Since response is already the data, we don't need to call .json()
    const transformedData = Array.isArray(response)
      ? response.map((product) => ({
          id: product.id,
          name: product.name,
          fullName: product.displayName?.text || product.name,
          title: product.displayName?.html || product.name,
          type: product.type,
          stockType: product.stockType,
          price: product.price,
          color: {
            name: product.color?.name,
            hex: product.color?.hex,
          },
          images: product.images || [],
          variants: product.variants || [],
          orderInfo: {
            estimatedDelivery: product.orderInfo?.estimatedDelivery,
            orderDeadline: product.orderInfo?.orderDeadline,
            minOrderQuantity: product.orderInfo?.minOrderQuantity || 1,
          },
          description: product.description,
          details: product.details,
          visible: product.visible,
        }))
      : [];
    return transformedData;
  } catch (error) {
    console.error("Error in fetchProducts:", error);
    throw new Error("Erro ao carregar produtos: " + error.message);
  }
};

export const fetchAvailableProducts = async () => {
  try {
    const products = await fetchProducts();

    return products.filter((product) => {
      let date = new Date();
      let deadline = new Date(product.orderInfo.orderDeadline);

      return deadline > date && product.visible;
    });
  } catch (error) {
    console.error("Failed to fetch available products:", error);
  }
};

export const fetchProductsByType = async (type) => {
  try {
    const products = await apiCall(`/api/store/products/type/${type}`);
    if (!Array.isArray(products)) {
      throw new Error("Invalid response format: expected array of products");
    }
    return products;
  } catch (error) {
    console.error("Failed to fetch products by type:", error);
    throw error;
  }
};

export const fetchProductById = (id) => apiCall(`/api/store/products/${id}`);

export const fetchFeaturedProducts = () =>
  apiCall("/api/store/products/featured");

export const fetchProductVariants = (productId) =>
  apiCall(`/api/store/products/${productId}/variants`);

export const checkProductAvailability = (productId, size) =>
  apiCall(`/api/store/products/${productId}/check-availability?size=${size}`);

export const getDeliveryInfo = (productId) =>
  apiCall(`/api/store/products/${productId}/delivery`);

export const createOrder = async (orderData) => {
  try {
    return await apiCall("/api/store/orders", 'POST', orderData);
  } catch (error) {
    console.error("Failed to create order:", error);
    return { error: error.message };
  }
};

export const fetchOrders = async () => {
  try {
    const orders = await apiCall("/api/store/orders");

    if (!Array.isArray(orders)) {
      throw new Error("Invalid response format: expected array of orders");
    }

    return orders;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw error;
  }
};

export const fetchOrdersByStatus = async (status) => {
  try {
    const orders = await apiCall(`/api/store/orders?status=${status}`);

    if (!Array.isArray(orders)) {
      throw new Error("Invalid response format: expected array of orders");
    }

    return orders;
  } catch (error) {
    console.error("Failed to fetch orders by status:", error);
    throw error;
  }
};

export const fetchOrdersByCustomerName = async (name) => {
  try {
    const orders = await apiCall(
      `/api/store/orders?customer_name=${encodeURIComponent(name)}`
    );

    if (!Array.isArray(orders)) {
      throw new Error("Invalid response format: expected array of orders");
    }

    return orders;
  } catch (error) {
    console.error("Failed to fetch orders by customer name:", error);
    throw error;
  }
};

export const fetchOrdersByEmail = async (email) => {
  try {
    const orders = await apiCall(
      `/api/store/orders?email=${encodeURIComponent(email)}`
    );

    if (!Array.isArray(orders)) {
      throw new Error("Invalid response format: expected array of orders");
    }

    return orders;
  } catch (error) {
    console.error("Failed to fetch orders by email:", error);
    throw error;
  }
};

export const fetchOrdersByPhone = async (phone) => {
  try {
    const orders = await apiCall(
      `/api/store/orders?phone=${encodeURIComponent(phone)}`
    );

    if (!Array.isArray(orders)) {
      throw new Error("Invalid response format: expected array of orders");
    }

    return orders;
  } catch (error) {
    console.error("Failed to fetch orders by phone:", error);
    throw error;
  }
};

export const fetchOrderById = async (orderId) => {
  try {
    const order = await apiCall(`/api/store/orders/${orderId}`);
    return order;
  } catch (error) {
    console.error(`Failed to fetch order ${orderId}:`, error);
    throw error;
  }
};

export const fetchOrderDetailsById = async (orderId) => {
  try {
    const orderDetails = await apiCall(`/api/store/orders/${orderId}/details`);
    return orderDetails;
  } catch (error) {
    console.error(`Failed to fetch order details for order ${orderId}:`, error);
    throw error;
  }
};

export const fetchAllOrdersDetails = async () => {
  try {
    const orders = await fetchOrders();
    if (!Array.isArray(orders)) {
      throw new Error("Invalid response format: expected array of orders");
    }

    const ordersDetails = await Promise.all(
      orders.map((order) => fetchOrderDetailsById(order.order_id))
    );

    return ordersDetails;
  } catch (error) {
    console.error("Failed to fetch all orders details:", error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId, updates) => {
  try {
    return apiCall(`/api/store/orders/${orderId}/status`, 'PATCH', updates);
  } catch (error) {
    console.error("Failed to update order status:", error);
    throw error;
  }
};

export const markOrderAsPaid = async (orderId, payment_responsible) => {
  return updateOrderStatus(orderId, {
    paid: true,
    payment_responsible,
  });
};

export const markOrderAsNotPaid = async (orderId, payment_responsible) => {
  return updateOrderStatus(orderId, {
    paid: false,
    payment_responsible,
  });
};

export const markOrderAsDelivered = async (orderId, delivery_responsible) => {
  return updateOrderStatus(orderId, {
    delivered: true,
    delivery_responsible,
  });
};

export const markOrderAsNotDelivered = async (
  orderId,
  delivery_responsible
) => {
  return updateOrderStatus(orderId, {
    delivered: false,
    delivery_responsible,
  });
};

export const cancelOrder = async (orderId) => {
  try {
    return await apiCall(`/api/store/orders/${orderId}/cancel`, 'POST');
  } catch (error) {
    console.error("Failed to cancel order:", error);
    throw error;
  }
};

export const generateExcel = async (orders) => {
  try {
    return await apiCall("/api/store/orders/export", 'POST', orders);
  } catch (error) {
    console.error("Failed to generate Excel:", error);
    throw error;
  }
};
