<template>
  <div class="modal fade" id="deviceModal" tabIndex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <form
          @submit.prevent="saveDevice"
          novalidate
          :class="submitted ? 'was-validated' : ''"
        >
          <div class="modal-header">
            <h5 class="modal-title">Device Details</h5>
            <button
              class="btn-close"
              type="button"
              @click="hideDeviceModal()"
            ></button>
          </div>
          <div class="modal-body">
            <div class="alert alert-danger" v-if="errorMessage">
              <strong>Error</strong> {{ errorMessage }}
            </div>
            <div class="form-group">
              <label for="name">Name</label>
              <input
                v-model="device.name"
                type="text"
                id="name"
                class="form-control"
                required
              />
              <div class="invalid-feedback">Device name is required.</div>
            </div>
            <div class="form-group">
              <label for="price">Price</label>
              <input
                v-model="device.price"
                type="number"
                min="1"
                step="any"
                id="price"
                class="form-control"
                required
              />
              <div class="invalid-feedback">
                Price is required and should be greater than 0.
              </div>
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea
                v-model="device.description"
                type="text"
                id="description"
                class="form-control"
                required
              ></textarea>
              <div class="invalid-feedback">Description is required.</div>
            </div>
            <div class="form-group">
              <label for="deviceType"></label>
              <select
                v-model="device.deviceType"
                name="type"
                id="type"
                class="form-select"
                required
              >
                <option value="" selected>Select device type</option>
                <option
                  v-for="(type, ind) in deviceTypes"
                  :key="ind"
                  :value="type"
                >
                  {{ type }}
                </option>
              </select>
              <div class="invalid-feedback"></div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary"
              type="button"
              @click="hideDeviceModal()"
            >
              Close
            </button>
            <button
              class="btn btn-primary"
              type="submit"
              
              @click="submitted = true"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Device from "../models/device";
import { ref } from "vue";
import DeviceType from "../models/device-type";
import DeviceService from "../services/device.service";
import $ from "jquery";

export default {
  name: "device-modal",
  props: {
    selectedDevice: { type: Object },
  },
  setup(props, context) {
    const device = ref(new Device());
    const errorMessage = ref("");
    const submitted = ref(false);
    const deviceTypes = ref([
      DeviceType.LAPTOP,
      DeviceType.PHONE,
      DeviceType.TABLET,
      DeviceType.DESKTOP,
    ]);

    const saveDevice = () => {
      if (
        !device.value.name ||
        !device.value.price ||
        !device.value.deviceType ||
        !device.value.description
      ) {
        return;
      }
      DeviceService.saveDevice(device.value)
        .then((response) => {
          context.emit("saved", response.data);
          hideDeviceModal()
          submitted.value = false;
        })
        .catch((err) => {
          errorMessage.value = "Unexpected error occurred";
          console.log(err);
        });

    };
    const showDeviceModal = () => {
      device.value = Object.assign({}, props.selectedDevice);
      $("#deviceModal").modal("show");
    };
    const hideDeviceModal = () => {
      $("#deviceModal").modal("hide");
    };

    return {
      device,
      errorMessage,
      submitted,
      deviceTypes,
      saveDevice,
      showDeviceModal,
      hideDeviceModal,
    };
  },
  /*
  data() {
    return {
      device: new Device(),
      errorMessage: "",
      submitted: false,
      deviceTypes: [
        DeviceType.LAPTOP,
        DeviceType.PHONE,
        DeviceType.TABLET,
        DeviceType.DESKTOP,
      ],
    };
  },
  methods: {
    saveDevice() {
      if (
        !this.device.name ||
        !this.device.price ||
        !this.device.deviceType ||
        !this.device.description
      ) {
        return;
      }
      DeviceService.saveDevice(this.device)
        .then((response) => {
          this.$emit("saved", response.data);
          $("#deviceModel").modal("hide");
        })
        .catch((err) => {
          this.errorMessage = "Unexpected error occurred";
          console.log(err);
        });
    },
    showDeviceModal() {
      this.device = Object.assign({}, this.selectedDevice);
      $("#deviceModal").modal("show");
    },
  },
  */
};
</script>
<style scoped></style>
