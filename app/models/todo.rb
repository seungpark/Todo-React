class Todo < ActiveRecord::Base
  validates :title, :body, presence: true
  validates_inclusion_of :done, in: [true, false]

end
