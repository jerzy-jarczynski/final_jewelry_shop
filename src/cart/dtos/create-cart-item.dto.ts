export class CreateCartItemDto {
  productId: string;
  amount: number;
  color: string;
  size: string;
  comment?: string;
}