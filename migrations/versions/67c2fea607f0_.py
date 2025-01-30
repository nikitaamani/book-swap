"""empty message

Revision ID: 67c2fea607f0
Revises: 4a603666a127
Create Date: 2025-01-30 13:09:01.958817

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '67c2fea607f0'
down_revision = '4a603666a127'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('categories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('book_category', sa.String(length=80), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_categories'))
    )
    op.create_table('booklistings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('book_id', sa.Integer(), nullable=False),
    sa.Column('price', sa.Float(), nullable=False),
    sa.Column('rental_fee', sa.Float(), nullable=False),
    sa.Column('listing_type', sa.String(length=20), nullable=False),
    sa.Column('status', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['book_id'], ['books.id'], name=op.f('fk_booklistings_book_id_books')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_booklistings_user_id_users')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_booklistings'))
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('book_id', sa.Integer(), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['book_id'], ['books.id'], name=op.f('fk_reviews_book_id_books')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_reviews_user_id_users')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_reviews'))
    )
    op.create_table('wishlists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('book_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['book_id'], ['books.id'], name=op.f('fk_wishlists_book_id_books')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_wishlists_user_id_users')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_wishlists'))
    )
    op.create_table('transactions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('buyer_id', sa.Integer(), nullable=True),
    sa.Column('seller_id', sa.Integer(), nullable=True),
    sa.Column('book_listing_id', sa.Integer(), nullable=False),
    sa.Column('transaction_date', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['book_listing_id'], ['booklistings.id'], name=op.f('fk_transactions_book_listing_id_booklistings')),
    sa.ForeignKeyConstraint(['buyer_id'], ['users.id'], name=op.f('fk_transactions_buyer_id_users')),
    sa.ForeignKeyConstraint(['seller_id'], ['users.id'], name=op.f('fk_transactions_seller_id_users')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_transactions'))
    )
    with op.batch_alter_table('books', schema=None) as batch_op:
        batch_op.add_column(sa.Column('author', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('category_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_books_category_id_categories'), 'categories', ['category_id'], ['id'])

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_constraint('uq_users_role', type_='unique')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.create_unique_constraint('uq_users_role', ['role'])

    with op.batch_alter_table('books', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_books_category_id_categories'), type_='foreignkey')
        batch_op.drop_column('category_id')
        batch_op.drop_column('author')

    op.drop_table('transactions')
    op.drop_table('wishlists')
    op.drop_table('reviews')
    op.drop_table('booklistings')
    op.drop_table('categories')
    # ### end Alembic commands ###
