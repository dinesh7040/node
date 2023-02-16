const admin = {
  properties: {
    email: {
      $ref: "defs#/definitions/admin/email",
    },
    password: {
      $ref: "defs#/definitions/admin/password",
    },
    name: {
      $ref: "defs#/definitions/admin/name",
    },
  },
};

const customer = {
  properties: {
    name: {
      $ref: "defs#/definitions/customer/name",
    },
    phone: {
      $ref: "defs#/definitions/customer/phone",
    },
    species: {
      $ref: "defs#/definitions/customer/species",
    },
    breed: {
      $ref: "defs#/definitions/customer/breed",
    },
    petName: {
      $ref: "defs#/definitions/customer/petName",
    },
    active: {
      $ref: "defs#/definitions/customer/active",
    },
    otp: {
      $ref: "defs#/definitions/customer/otp",
    },
  },
};

const doctor = {
  properties: {
    id: {
      $ref: "defs#/definitions/doctor/id",
    },
    name: {
      $ref: "defs#/definitions/doctor/name",
    },
    phone: {
      $ref: "defs#/definitions/doctor/phone",
    },
    designation: {
      $ref: "defs#/definitions/doctor/designation",
    },
    currently_working: {
      $ref: "defs#/definitions/doctor/currently_working",
    },
    regno: {
      $ref: "defs#/definitions/doctor/registrationNumber",
    },
    doorNo: {
      $ref: "defs#/definitions/doctor/doorNo",
    },
    streetName: {
      $ref: "defs#/definitions/doctor/streetName",
    },
    city: {
      $ref: "defs#/definitions/doctor/city",
    },
    taluk: {
      $ref: "defs#/definitions/doctor/taluk",
    },
    district: {
      $ref: "defs#/definitions/doctor/district",
    },
    pincode: {
      $ref: "defs#/definitions/doctor/pincode",
    },
    photo: {
      $ref: "defs#/definitions/doctor/photo",
    },
    signature: {
      $ref: "defs#/definitions/doctor/signature",
    },
    otp: {
      $ref: "defs#/definitions/doctor/otp",
    },
    approval_status: {
      $ref: "defs#/definitions/doctor/approval_status",
    },
    message: {
      $ref: "defs#/definitions/doctor/message",
    },
    email: {
      $ref: "defs#/definitions/doctor/email",
    },
    status: {
      $ref: "defs#/definitions/doctor/status",
    }
  },
};

const designation = {
  properties: {
    designation: {
      $ref: "defs#/definitions/doctor/designation",
    },
  },
};

const district = {
  properties: {
    id: {
      $ref: "defs#/definitions/district/id",
    },
    district: {
      $ref: "defs#/definitions/doctor/district",
    },
    taluk: {
      $ref: "defs#/definitions/doctor/taluk",
    },
    status: {
      $ref: "defs#/definitions/district/status",
    },
  },
};

const news = {
  properties: {
    id: {
      $ref: "defs#/definitions/news/id",
    },
    title: {
      $ref: "defs#/definitions/news/news_title",
    },
    description: {
      $ref: "defs#/definitions/news/news_description",
    },
    photo: {
      $ref: "defs#/definitions/news/photo",
    },
    district: {
      $ref: "defs#/definitions/news/district",
    },
    taluk: {
      $ref: "defs#/definitions/news/taluk",
    },
  },
};

const resource = {
  properties: {
    id: {
      $ref: "defs#/definitions/resource/id",
    },
    name: {
      $ref: "defs#/definitions/resource/name",
    },
    mobile: {
      $ref: "defs#/definitions/resource/mobile",
    },
    doorno: {
      $ref: "defs#/definitions/resource/doorno",
    },
    street: {
      $ref: "defs#/definitions/resource/street",
    },
    city: {
      $ref: "defs#/definitions/resource/city",
    },
    taluk: {
      $ref: "defs#/definitions/resource/taluk",
    },
    district: {
      $ref: "defs#/definitions/resource/district",
    },
    pincode: {
      $ref: "defs#/definitions/resource/pincode",
    },
    photo: {
      $ref: "defs#/definitions/resource/photo",
    },
    resourceType: {
      $ref: "defs#/definitions/resource/resource_type",
    },
    status: {
      $ref: "defs#/definitions/resource/status",
    },
    postStatus: {
      $ref: "defs#/definitions/resource/post_status",
    },
    reason: {
      $ref: "defs#/definitions/resource/reason",
    },
  },
};

const animal = {
  properties: {
    id: {
      $ref: "defs#/definitions/animal/id",
    },
    pet: {
      $ref: "defs#/definitions/animal/pet",
    },
    breed: {
      $ref: "defs#/definitions/animal/breed",
    },
  },
};

const buysell = {
  properties: {
    id: {
      $ref: "defs#/definitions/buysell/id",
    },
    species: {
      $ref: "defs#/definitions/buysell/species",
    },
    breed: {
      $ref: "defs#/definitions/buysell/breed",
    },
    mobile: {
      $ref: "defs#/definitions/buysell/mobile",
    },
    name: {
      $ref: "defs#/definitions/buysell/name",
    },
    age: {
      $ref: "defs#/definitions/buysell/age",
    },
    gender: {
      $ref: "defs#/definitions/buysell/gender",
    },
    doorno: {
      $ref: "defs#/definitions/buysell/doorno",
    },
    street: {
      $ref: "defs#/definitions/buysell/street",
    },
    city: {
      $ref: "defs#/definitions/buysell/city",
    },
    taluk: {
      $ref: "defs#/definitions/buysell/taluk",
    },
    district: {
      $ref: "defs#/definitions/buysell/district",
    },
    pincode: {
      $ref: "defs#/definitions/buysell/pincode",
    },
    price: {
      $ref: "defs#/definitions/buysell/price",
    },
    about: {
      $ref: "defs#/definitions/buysell/about",
    },
    photo: {
      $ref: "defs#/definitions/buysell/photo",
    },
    orderId: {
      $ref: "defs#/definitions/buysell/order_id",
    },
    paymentStatus: {
      $ref: "defs#/definitions/buysell/payment_status",
    },
    phoneVerifiedStatus: {
      $ref: "defs#/definitions/buysell/ph_verified_status",
    },
  },
};

const adoption = {
  properties: {
    id: {
      $ref: "defs#/definitions/adoption/id",
    },
    species: {
      $ref: "defs#/definitions/adoption/species",
    },
    breed: {
      $ref: "defs#/definitions/adoption/breed",
    },
    gender: {
      $ref: "defs#/definitions/adoption/gender",
    },
    age: {
      $ref: "defs#/definitions/adoption/age",
    },
    name: {
      $ref: "defs#/definitions/adoption/name",
    },
    phone: {
      $ref: "defs#/definitions/adoption/phone",
    },
    doorno: {
      $ref: "defs#/definitions/adoption/doorno",
    },
    street: {
      $ref: "defs#/definitions/adoption/street",
    },
    city: {
      $ref: "defs#/definitions/adoption/city",
    },
    district: {
      $ref: "defs#/definitions/adoption/district",
    },
    taluk: {
      $ref: "defs#/definitions/adoption/taluk",
    },
    pincode: {
      $ref: "defs#/definitions/adoption/pincode",
    },
    color: {
      $ref: "defs#/definitions/adoption/color",
    },
    about: {
      $ref: "defs#/definitions/adoption/about",
    },
    photo: {
      $ref: "defs#/definitions/adoption/photo",
    },
  },
};

const whatsapp = {
  properties: {
    id: {
      $ref: "defs#/definitions/whatsapp/id",
    },
    link: {
      $ref: "defs#/definitions/whatsapp/link",
    },
    status: {
      $ref: "defs#/definitions/whatsapp/status",
    },
  },
};

const feedFormulation = {
  properties: {
    id: {
      $ref: "defs#/definitions/feedformulation/id",
    },
    animal_type: {
      $ref: "defs#/definitions/feedformulation/animal_type",
    },
    ingredient: {
      $ref: "defs#/definitions/feedformulation/ingredient",
    },
    range: {
      $ref: "defs#/definitions/feedformulation/range",
    },
    cp: {
      $ref: "defs#/definitions/feedformulation/cp",
    },
    me: {
      $ref: "defs#/definitions/feedformulation/me",
    },
    status: {
      $ref: "defs#/definitions/feedformulation/status",
    },
    poultryType: {
      $ref: "defs#/definitions/feedformulation/poultry_type",
    },
    poultryStandard: {
      $ref: "defs#/definitions/feedformulation/poultry_standard",
    }
  },
};

const drugIndex = {
  properties: {
    id: {
      $ref: "defs#/definitions/drugindex/id",
    },
    name: {
      $ref: "defs#/definitions/drugindex/name",
    },
    action: {
      $ref: "defs#/definitions/drugindex/action",
    },
    dose: {
      $ref: "defs#/definitions/drugindex/dose",
    },
    availability: {
      $ref: "defs#/definitions/drugindex/availability",
    },
    note: {
      $ref: "defs#/definitions/drugindex/note",
    },
    status: {
      $ref: "defs#/definitions/drugindex/status",
    },
  },
};

const dose = {
  properties: {
    id: {
      $ref: "defs#/definitions/dose/id",
    },
    list_id: {
      $ref: "defs#/definitions/dose/list_id",
    },
    species: {
      $ref: "defs#/definitions/dose/species",
    },
    one_m: {
      $ref: "defs#/definitions/dose/one_m",
    },
    one_v: {
      $ref: "defs#/definitions/dose/one_v",
    },
    sc: {
      $ref: "defs#/definitions/dose/sc",
    },
    oral: {
      $ref: "defs#/definitions/dose/oral",
    },
    status: {
      $ref: "defs#/definitions/dose/status",
    },
  },
};

const availability = {
  properties: {
    id: {
      $ref: "defs#/definitions/availability/id",
    },
    brand: {
      $ref: "defs#/definitions/availability/brand",
    },
    avail_type: {
      $ref: "defs#/definitions/availability/avail_type",
    },
    trade_name: {
      $ref: "defs#/definitions/availability/trade_name",
    },
    presentative: {
      $ref: "defs#/definitions/availability/presentative",
    },
    status: {
      $ref: "defs#/definitions/availability/status",
    },
  },
};

const rating = {
  properties: {
    id: {
      $ref: "defs#/definitions/rating/id",
    },
    rating: {
      $ref: "defs#/definitions/rating/rating"
    }
  }
}

const forum = {
  properties: {
    id: {
      $ref: "defs#/definitions/forum/id",
    },
    chatId: {
      $ref: "defs#/definitions/forum/chatId",
    },
    askerId: {
      $ref: "defs#/definitions/forum/askerId",
    },
    replierId: {
      $ref: "defs#/definitions/forum/replierId",
    },
    chat: {
      $ref: "defs#/definitions/forum/chat",
    },
    active: {
      $ref: "defs#/definitions/forum/active",
    }
  }
}

const otp = {
  properties: {
    otp: {
      $ref: "defs#/definitions/verification/otp",
    },
    phone: {
      $ref: "defs#/definitions/verification/phone",
    },
    id: {
      $ref: "defs#/definitions/verification/id",
    }
  }
}

const editRequest = {
  properties: {
    query: {
      $ref: "defs#/definitions/editRequest/query",
    },
    status: {
      $ref: "defs#/definitions/editRequest/status",
    }
  }
}

const ruminant = {
  properties: {
    id: {
      $ref: "defs#/definitions/ruminant/id",
    },
    name: {
      $ref: "defs#/definitions/ruminant/name",
    },
    cp: {
      $ref: "defs#/definitions/ruminant/cp",
    },
    type: {
      $ref: "defs#/definitions/ruminant/ruminant_type",
    }
  }
}

// otp verify
export const verifyOtp = {
  type: "object",
  $id: "verifyOtp",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        phone: customer.properties.phone,
        otp: customer.properties.otp,
      },
    },
  ],
  required: ["phone", "otp"],
  errorMessage: {
    properties: {
      phone: "Invalid phone number",
      otp: "Invalid otp",
    },
  },
};

export const findNearByDetails = {
  type: "object",
  $id: "findNearByDetails",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        id: doctor.properties.id,
      },
    },
  ],
  required: ["id"],
  errorMessage: {
    properties: {
      id: "Invalid id",
    },
  },
};

// list resources
export const resourcesList = {
  type: "object",
  $id: "resourceList",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        district: resource.properties.district,
        type: resource.properties.resourceType,
      },
    },
  ],
  required: ["type"],
  errorMessage: {
    properties: {
      type: "Resorce type should be any one this PET_CLINIC,LABS,FEED_SHOPS,FARM_EQUIPMENTS,POULTRY_EQUIPMENTS ",
      district: "Invalid District",
    },
  },
};

// customer signup
export const customerSignup = {
  type: "object",
  $id: "customerSignup",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        name: customer.properties.name,
        phone: customer.properties.phone,
        species: customer.properties.species,
        breed: customer.properties.breed,
        petName: customer.properties.petName,
      },
    },
  ],
  required: ["name", "phone", "species", "breed", "petName"],
  errorMessage: {
    properties: {
      name: "Invalid name",
      phone: "Invalid phone number",
      species: "Invalid species",
      breed: "Invalid breed",
      petName: "Invalid pet name",
    },
  },
};

// customer login
export const login = {
  type: "object",
  $id: "customerLogin",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        phone: customer.properties.phone,
        otp: customer.properties.otp,
      },
    },
  ],
  required: ["phone", "otp"],
  errorMessage: {
    properties: {
      phone: "Invalid phone number ! Phone number length must be 10",
      otp: "Invalid otp! OTP must be at least 4 characters",
    },
  },
};

// add drug index
export const addDrugIndex = {
  type: "object",
  $id: "addDrugIndex",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        name: drugIndex.properties.name,
        action: drugIndex.properties.action,
        dose: drugIndex.properties.dose,
        availability: drugIndex.properties.availability,
        note: drugIndex.properties.note,
      },
    },
  ],
  required: ["name", "action", "dose", "availability", "note"],
  errorMessage: {
    properties: {
      dose: "Invalid dose! Dose must be an array and length should be minimum 1",
      availability:
        "Invalid availability! Availability must be an array and length should be min 1",
    },
  },
};

// remove drug index
export const removeDrugIndex = {
  type: "object",
  $id: "removeDrugIndex",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        id: drugIndex.properties.id,
      },
    },
  ],
  required: ["id"],
  errorMessage: {
    properties: {
      id: "Invalid id! Id must be a number",
    },
  },
};

// add dose for drug index
export const drugIndexDose = {
  type: "object",
  $id: "addDose",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        species: dose.properties.species,
        one_m: dose.properties.one_m,
        one_v: dose.properties.one_v,
        sc: dose.properties.sc,
        oral: dose.properties.oral,
      },
    },
  ],
  required: ["species", "one_m", "one_v", "sc", "oral"],
  errorMessage: {
    properties: {
      species: "Invalid species",
      one_m: "Invalid 1/m",
      one_v: "Invalid 1/v",
      sc: "Invalid sc",
      oral: "Invalid oral",
    },
  },
};

// list dose
export const drugIndexDoseList = {
  type: "object",
  $id: "doseList",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        id: dose.properties.list_id,
      },
    },
  ],
  required: ["id"],
  errorMessage: {
    properties: {
      id: "Invalid id! Id must be array and length should be 1",
    },
  },
};

// remove dose
export const removeDose = {
  type: "object",
  $id: "removeDose",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        id: dose.properties.id,
      },
    },
  ],
  required: ["id"],
};

// add availability
export const drugIndexAvailability = {
  type: "object",
  $id: "addAvailability",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        brand: availability.properties.brand,
        type: availability.properties.avail_type,
        trade_name: availability.properties.trade_name,
        presentative: availability.properties.presentative,
      },
    },
  ],
  required: ["brand", "type", "trade_name", "presentative"],
  errorMessage: {
    properties: {
      brand: "Invalid brand",
      type: "Invalid type",
      trade_name: "Invalid trade name",
      presentative: "Invalid presentative",
    },
  },
};

// list availability
export const drugIndexAvailabilityList = {
  type: "object",
  $id: "availabilityList",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        id: dose.properties.list_id,
      },
    },
  ],
  required: ["id"],
  errorMessage: {
    properties: {
      id: "Invalid id! id should be an array and length must be 1",
    },
  },
};

// remove availability
export const removeAvailability = {
  type: "object",
  $id: "removeAvailability",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        id: availability.properties.id,
      },
    },
  ],
  required: ["id"],
  errorMessage: {
    properties: {
      id: "Invalid id!",
    },
  },
};

// delete designation
export const deleteDesignation = {
  type: "object",
  $id: "deleteDesignation",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        id: doctor.properties.id,
      },
    },
  ],
};

// add poultry type
export const poultryType = {
  type: "object",
  $id: "poultryType",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        type: feedFormulation.properties.poultryType,
        cp_standard: feedFormulation.properties.poultryStandard,
        me_standard: feedFormulation.properties.poultryStandard,
      }
    }
  ],
  required: ["type", "cp_standard", "me_standard"],
  errorMessage: {
    properties: {
      type: "Invalid poultry type",
      cp_standard: "Invalid standard",
      me_standard: "Invalid standard",
    }
  }
}

// delete poultry type
export const deletePoultryType = {
  type: "object",
  $id: "deletePoultryType",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        id: feedFormulation.properties.id,
      }
    }
  ],
  required: ["id"],
  errorMessage: {
    properties: {
      id: "Invalid id",
    }
  }
}

// add feed formulation data
export const feedFormulationSchema = {
  type: "object",
  $id: "feedformulation",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        animal_type: feedFormulation.properties.animal_type,
        ingredient: feedFormulation.properties.ingredient,
        range: feedFormulation.properties.range,
        cp: feedFormulation.properties.cp,
        me: feedFormulation.properties.me,
        price: feedFormulation.properties.cp,
      },
    },
  ],
  required: ["animal_type", "ingredient", "range", "cp", "me", 'price'],
  errorMessage: {
    properties: {
      animal_type: "Type should be one of the following: 'poultry','ruminant'",
      range: "Invalid range",
      cp: "Invalid cp",
      me: "Invalid me",
      price: "Invalid price",

    },
  },
};

// delete feed formulation data
export const feedFormulationDeleteSchema = {
  type: "object",
  $id: "deleteFeedFormulation",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        id: feedFormulation.properties.id,
      },
    },
  ],
  required: ["id"],
};

// add whatsapp group link
export const whatsappGroup = {
  type: "object",
  $id: "whatsapp",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        link: whatsapp.properties.link,
      },
    },
  ],
  required: ["link"],
  errorMessage: {
    properties: {
      link: "Invalid Link",
    },
  },
};

// change whatsapp group link status
export const whatsappGroupStatus = {
  type: "object",
  $id: "whatsappStatus",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        id: whatsapp.properties.id,
        status: whatsapp.properties.status,
      },
    },
  ],
  required: ["status", "id"],
  errorMessage: {
    properties: {
      status:
        "Invalid Status! status should be either ACTIVE or DEACTIVE or DELETE",
    },
  },
};

// add animal for adoption
export const addAdoption = {
  type: "object",
  $id: "adoptions",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        id: adoption.properties.id,
        species: adoption.properties.species,
        breed: adoption.properties.breed,
        gender: adoption.properties.gender,
        age: adoption.properties.age,
        name: adoption.properties.name,
        phone: adoption.properties.phone,
        doorno: adoption.properties.doorno,
        street: adoption.properties.street,
        city: adoption.properties.city,
        district: adoption.properties.district,
        taluk: adoption.properties.taluk,
        pincode: adoption.properties.pincode,
        color: adoption.properties.color,
        about: adoption.properties.about,
        photo: adoption.properties.photo,
      },
    },
  ],
  required: [
    "species",
    "breed",
    "gender",
    "age",
    "name",
    "phone",
    "doorno",
    "street",
    "city",
    "district",
    "taluk",
    "pincode",
    "color",
    "about",
    "photo",
  ],
  errorMessage: {
    properties: {
      gender: "Gender should be either male or female",
      phone: "Phone number length should be 10",
      street: "Invalid Street",
      city: "Invalid City",
      pincode: "Pincode length must be 6",
    },
  },
};

// adoption : details of pet
export const adoptionDetails = {
  type: "object",
  $id: "adoptionDetails",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        id: adoption.properties.id,
      },
    },
  ],
  required: ["id"],
};

// delete breed
export const deleteBreed = {
  type: "object",
  $id: "deleteBreed",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        breedId: animal.properties.id,
      },
    },
  ],
  required: ["breedId"],
  errorMessage: {
    properties: {
      id: "Invalid id",
    },
  },
};

// selling pet detail
export const sellingPetDetail = {
  type: "object",
  $id: "sellingPetDetail",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        id: buysell.properties.id,
      },
    },
  ],
  required: ["id"],
};

// paytm payment verification
export const paytmVerification = {
  type: "object",
  $id: "paytmVerification",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        id: buysell.properties.id,
        orderId: buysell.properties.orderId,
      }
    }
  ],
  required: ["id", "orderId"],
  errorMessage: {
    properties: {
      id: "Invalid id",
      orderId: "Invalid order id",
    }
  }
}

// list pet
export const listPet = {
  type: "object",
  $id: "listPet",
  allOf: [{
    additionalProperties: false,
    properties: {
      district: buysell.properties.district,
      species: buysell.properties.species,
      breed: buysell.properties.breed,
    }
  }],
  errorMessage: {
    properties: {
      district: "Invalid district",
      species: "Invalid species",
      breed: "Invalid breed",
    }
  }
}

// sell animal
export const sellAnimal = {
  type: "object",
  $id: "sellPet",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        species: buysell.properties.species,
        breed: buysell.properties.breed,
        mobile: buysell.properties.mobile,
        name: buysell.properties.name,
        age: buysell.properties.age,
        gender: buysell.properties.gender,
        doorno: buysell.properties.doorno,
        street: buysell.properties.street,
        city: buysell.properties.city,
        taluk: buysell.properties.taluk,
        district: buysell.properties.district,
        pincode: buysell.properties.pincode,
        price: buysell.properties.price,
        about: buysell.properties.about,
        photo: buysell.properties.photo
      },
    },
  ],
  required: [
    "species",
    "breed",
    "mobile",
    "age",
    "gender",
    "doorno",
    "street",
    "city",
    "taluk",
    "district",
    "pincode",
    "price",
    "about",
    "photo",
  ],
  errorMessage: {
    properties: {
      mobile: "Mobile number should be 10 digits",
      gender: "Gender should be either Male or Female",
      photo: "Invalid Photo",
    },
  },
};

// delete animal
export const deleteAnimal = {
  type: "object",
  $id: "deleteAnimal",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        petId: animal.properties.id,
      },
    },
  ],
  required: ["petId"],
};

// add animal
export const addAnimal = {
  type: "object",
  $id: "addAnimal",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        pet: animal.properties.pet,
      },
    },
  ],
  required: ["pet"],
};

// add breed
export const addBreed = {
  type: "object",
  $id: "addBreed",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        petId: animal.properties.id,
        breed: animal.properties.breed,
      },
    },
  ],
  required: ["petId", "breed"],
};

// view breed
export const viewBreed = {
  type: "object",
  $id: "breedList",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        id: animal.properties.id,
      },
    },
  ],
  errorMessage: {
    properties: {
      id: "Invalid id",
    },
  },
};

// get resource list
export const resourceList = {
  type: "object",
  $id: "resourceStatus",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        status: resource.properties.status,
      },
    },
  ],
  required: ["status"],
  errorMessage: {
    properties: {
      status: "Invalid status",
    },
  },
};

// my uploads
export const myUploads = {
  type: "object",
  $id: "myUploads",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        status: doctor.properties.status,
      },
    },
  ],
  required: ["status"],
  errorMessage: {
    properties: {
      status: "Invalid status. status should be one of the following values : all, published, pending, rejected"
    }
  }
};

// update resource
export const updateResource = {
  type: "object",
  $id: "updateResource",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        id: resource.properties.id,
        status: resource.properties.status,
        reason: resource.properties.reason,
      },
    },
  ],
  required: ["id", "status"],
  errorMessage: {
    properties: {
      status:
        "Invalid status! status should be either pending, approved or rejected",
      reason: "Invalid reason, should be minimum 1 characters",
    },
  },
};

// add resource
export const addResource = {
  type: "object",
  $id: "addResource",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        name: resource.properties.name,
        mobile: resource.properties.mobile,
        doorno: resource.properties.doorno,
        street: resource.properties.street,
        ownerName: resource.properties.name,
        city: resource.properties.city,
        taluk: resource.properties.taluk,
        district: resource.properties.district,
        pincode: resource.properties.pincode,
        photo: resource.properties.photo,
        resourceType: resource.properties.resourceType,
      },
    },
  ],
  required: [
    "name",
    "mobile",
    "doorno",
    "street",
    "city",
    "ownerName",
    "taluk",
    "district",
    "pincode",
    "photo",
    "resourceType",
  ],
  errorMessage: {
    properties: {
      photo: "Resource image is required",
      mobile: "Invalid Phoneno, Phone number should be of 10 digits",
      pincode: "Invalid pincode, Pincode should be of 6 digits",
      resourceType: "Invalid Resourcetype",
      name: "Invalid name",
      ownerName: "Invalid ownerName"
    },
  },
};

// delete resource
export const deleteResource = {
  type: "object",
  $id: "delResource",
  allOf: [{
    additionalProperties: false,
    properties: {
      id: resource.properties.id,
    }

  }],
  required: ["id"],
  errorMessage: {
    properties: {
      id: "Invalid resource id",
    },
  }
}

// add rating 
export const addRating = {
  type: "object",
  $id: "addRating",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        doctorId: rating.properties.id,
        rating: rating.properties.rating,
      }
    }
  ],
  required: ["doctorId", "rating"],
  errorMessage: {
    properties: {
      doctorId: "Invalid doctor id",
      rating: "Invalid rating, rating should be 1-5"
    }
  }
}

// add resource rating
export const addResourceRating = {
  type: "object",
  $id: "addResourceRating",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        resourceId: rating.properties.id,
        rating: rating.properties.rating
      }
    }
  ],
  required: ["resourceId", "rating"],
  errorMessage: {
    properties: {
      doctorId: "Invalid resource id",
      rating: "Invalid rating, rating should be 1-5"
    }
  }
}


// find nearby doctors
export const findNearbyDoctors = {
  type: "object",
  $id: "findNearbyDoctors",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        district: doctor.properties.district,
      },
    },
  ],
};

// search news feed
export const searchNews = {
  type: "object",
  $id: "newsSearch",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        district: news.properties.district,
      },
    },
  ],
  required: ["district"],
};

// news description
export const newsDescription = {
  type: "object",
  $id: "newsDescription",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        id: news.properties.id,
      },
    },
  ],
  required: ["id"],
  errorMessage: {
    properties: {
      id: "Invalid id.",
    },
  },
};

// delete news
export const deleteNews = {
  type: "object",
  $id: "deleteNews",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        id: news.properties.id,
      },
    },
  ],
  required: ["id"],
};

// add news
export const addNews = {
  type: "object",
  $id: "addNews",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        title: news.properties.title,
        description: news.properties.description,
        photo: news.properties.photo,
        district: news.properties.district,
        taluk: news.properties.taluk,
      },
    },
  ],
  required: ["title", "description", "photo", "district", "taluk"],
};

// update news
export const updateNews = {
  type: "object",
  $id: "updateNews",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        id: news.properties.id,
        title: news.properties.title,
        description: news.properties.description,
        photo: news.properties.photo,
        district: news.properties.district,
        taluk: news.properties.taluk,
      },
    },
  ],
  required: ["title", "description", "photo", "district", "taluk", "id"],
};

// delete district
export const deleteDistrict = {
  type: "object",
  $id: "deleteDistrict",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        id: district.properties.id,
        status: district.properties.status,
      },
    },
  ],
  required: ["id"],
  errorMessage: {
    properties: {
      id: "Invalid id",
      status: "Invalid status. Status must be either true or false",
    },
  },
};

// add district
export const addDistrict = {
  type: "object",
  $id: "addDistrict",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        district: district.properties.district,
        taluk: district.properties.taluk,
      },
    },
  ],
  required: ["district", "taluk"],
  errorMessage: {
    properties: {
      district: "Invalid district name",
      taluk: "Invalid taluk name",
    },
  },
};

// doctor instant approval
export const doctorInstantApproval = {
  type: "object",
  $id: "doctorInstantApproval",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        id: doctor.properties.id,
        email: doctor.properties.email,
        message: doctor.properties.message,
      },
    },
  ],
  required: ["id", "message"],
  errorMessage: {
    properties: {
      email: "Please enter valid email address",
    },
  },
};

// update doctor status
export const updateDoctorStatus = {
  type: "object",
  $id: "updateDoctorStatus",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        id: doctor.properties.id,
        status: doctor.properties.approval_status,
        review: doctor.properties.message,
      },
    },
  ],
  required: ["id", "status"],
  errorMessage: {
    properties: {
      status:
        "Invalid Status! status should be approved or pending or rejected ",
      review: "Invalid Review",
    },
  },
};

// doctor login
export const doctorLogin = {
  type: "object",
  $id: "doctorLogin",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        phone: doctor.properties.phone,
        otp: doctor.properties.otp,
      },
    },
  ],
  required: ["otp", "phone"],
  errorMessage: {
    properties: {
      phone: "Invalid phone number, Phone number should be 10 digits",
      otp: "Invalid otp. Otp should be 4 digits",
    }
  }
};

export const checkPhone = {
  type: "object",
  $id: "checkPhone",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        phone: doctor.properties.phone
      }
    }
  ],
  required: ["phone"],
  errorMessage: {
    properties: {
      phone: "Invalid phone number, Phone number should be 10 digits",
    }
  }
}

// doctor signup
export const doctorSignup = {
  type: "object",
  $id: "doctorSignup",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        name: doctor.properties.name,
        phone: doctor.properties.phone,
        designation: doctor.properties.designation,
        currentlyWorking: doctor.properties.currently_working,
        regno: doctor.properties.regno,
        doorNo: doctor.properties.doorNo,
        streetName: doctor.properties.streetName,
        city: doctor.properties.city,
        taluk: doctor.properties.taluk,
        district: doctor.properties.district,
        pincode: doctor.properties.pincode,
        photo: doctor.properties.photo,
        signature: doctor.properties.signature,
      },
    },
  ],
  required: [
    "name",
    "phone",
    "designation",
    "regno",
    "doorNo",
    "streetName",
    "city",
    "taluk",
    "district",
    "pincode",
    "photo",
    "signature",
  ],
  errorMessage: {
    properties: {
      name: "Invalid Name",
      phone: "Invalid phone number",
      designation: "Invalid designation",
      currentlyWorking: "The work description is not appropriate",
      regno: "Invalid registration number",
      doorNo: "Invalid door number",
      streetName: "Invalid street name",
      city: "Invalid city",
      taluk: "Invalid taluk",
      district: "Invalid district",
      pincode: "Invalid pincode",
    },
  },
};

// admin login
export const adminLogin = {
  type: "object",
  $id: "adminLogin",
  additionalProperties: false,
  properties: {
    email: admin.properties.email,
    password: admin.properties.password,
  },
  required: ["email", "password"],
};

// admin signup
export const adminSignup = {
  type: "object",
  $id: "adminSignup",
  additionalProperties: false,
  properties: {
    name: admin.properties.name,
    email: admin.properties.email,
    password: admin.properties.password,
  },
  required: ["name", "email", "password"],
};

// admin add designation
export const addDesignation = {
  type: "object",
  $id: "addDesination",
  additionalProperties: false,
  properties: {
    designation: designation.properties.designation,
  },
  required: ["designation"],
};

// forum ask question
export const askQuestion = {
  type: "object",
  $id: "askQuestion",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        chat: forum.properties.chat,
      }
    }
  ],
  required: ["chat"],
  errorMessage: {
    properties: {
      chat: "Invalid chat",
    }
  }
}

// forum reply to question
export const answerQuestion = {
  type: "object",
  $id: "reply",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        chatId: forum.properties.chatId,
        chat: forum.properties.chat,
      }
    }
  ],
  required: ["chatId", "chat"],
  errorMessage: {
    properties: {
      chatId: "Invalid chatId",
      chat: "Invalid chat message",
    }
  }
}

// forum chat
export const chat = {
  type: "object",
  $id: "forumChat",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        chatId: forum.properties.chatId
      }
    }
  ],
  required: ['chatId'],
  errorMessage: {
    properties: {
      chatId: "Invalid chatId"
    }
  }
}

// resource otp verification
export const otpVerification = {
  type: "object",
  $id: "resourceOtpVerification",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        phone: otp.properties.phone,
        otp: otp.properties.otp,
        id: otp.properties.id,
      }
    }
  ],
  required: ["phone", "otp", "id"],
  errorMessage: {
    properties: {
      phone: "Invalid phone number",
      otp: "Invalid otp",
      id: "Invalid id",
    }
  }
}

// send otp 
export const sendOtp = {
  type: "object",
  $id: "sendOtp",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        phone: otp.properties.phone,
      }
    }
  ],
  required: ["phone"],
  errorMessage: {
    properties: {
      phone: "Invalid phone number",
    }
  }
}

// request edit profile
export const requestEditProfile = {
  type: "object",
  $id: "riseQuery",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        query: editRequest.properties.query,
      }
    }
  ],
  required: ["query"],
  errorMessage: {
    properties: {
      query: "Invalid query",
    }
  }
}

// add ruminant data
export const addRuminant = {
  type: "object",
  $id: "addRuminant",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        name: ruminant.properties.name,
        type: ruminant.properties.type,
        cp: ruminant.properties.cp,
      }
    }
  ],
  required: ["name", "type", "cp"],
  errorMessage: {
    properties: {
      name: "Invalid name",
      type: "Invalid type, only energy, protein and by product are allowed",
      cp: "Invalid cp",
    }
  }
}

// delete ruminant data
export const deleteRuminant = {
  type: "object",
  $id: "deleteRuminant",
  allOf: [{
    additionalProperties: false,
    properties: {
      id: ruminant.properties.id,
    }
  }],
  required: ["id"],
  errorMessage: {
    properties: {
      id: "Invalid id",
    }
  }
}

// my post
export const mypost = {
  type: "object",
  $id: "mypost",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        status: resource.properties.postStatus
      }
    }
  ],
  required: ["status"],
  errorMessage: {
    properties: {
      status: "Invalid status. Status must be one of the following values: all, active, draft"
    }
  }
}

// search drug index for doctor
export const searchDrugIndex = {
  type: "object",
  $id: "searchDrugIndex",
  allOf: [
    {
      additionalProperties: false,
      properties: {
        search: doctor.properties.name
      }
    }
  ],
  required: ["search"],
  errorMessage: {
    properties: {
      search: "Invalid search parameter"
    }
  }
}