class ApiFeatures {
  constructor(mongooseQuery, data) {
    this.mongooseQuery = mongooseQuery;
    this.data = data;
  }
  pagination() {
    let { page, size } = this.data;
    if (!page || page <= 0) {
      page = 1;
    }
    if (!size || size <= 0) {
      size = 3;
    }
    const skip = (page - 1) * size;
    this.mongooseQuery = this.mongooseQuery.limit(size).skip(skip);
    return this;
  }
  filter() {
    const excludeQuery = { ...this.data };
    const includeArray = ["page", "size", "sort", "fields", "search"];
    includeArray.forEach((element) => {
      delete excludeQuery[element];
    });

    const filter = JSON.parse(
      JSON.stringify(excludeQuery).replace(
        /(gt|lt|gte|lte|eq|in|nin|ne)/g,
        (match) => `$${match}`
      )
    );
    this.mongooseQuery = this.mongooseQuery.find(filter);
    return this;
  }
  sort() {
    if (this.data.sort) {
      this.data.sort = this.data.sort.replaceAll(",", " ");
      this.mongooseQuery = this.mongooseQuery.sort(this.data.sort);
    }
    return this;
  }
  fields() {
    if (this.data.fields) {
      this.data.fields = this.data.fields.replaceAll(",", " ");
      this.mongooseQuery = this.mongooseQuery.select(this.data.fields);
    }
    return this;
  }
  search() {
    if (this.data.search) {
      this.mongooseQuery = this.mongooseQuery.find({
        $or: [
          { name: { $regex: this.data.search } },
          {description:{$regex:this.data.search}}
        ]
      });
    }
    return this;
  }
}

export default ApiFeatures